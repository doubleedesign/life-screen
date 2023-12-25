import { titleCase } from '../utils.ts';
const files = import.meta.glob('./**/*.md');
import _ from 'lodash';
import { RouteRecordNormalized } from 'vue-router';

export type Branch = Pick<RouteRecordNormalized, 'name' | 'path'> & {
	children: Twig[] | Leaf[]
}

export type Twig = Pick<RouteRecordNormalized, 'name' | 'path'> & {
	children?: Leaf[]
}

export type Leaf = {
	path: string;
	name: string;
}

type RawLeaf = {
	path: string;
	file: string;
}


export class ContentTree {
	collection: object = {};
	tree: Branch[] = [];

	constructor() {
		const rows = Object.keys(files).map(path => {
			const pieces = path.split('/').filter(piece => piece !== '.');
			const file = pieces.pop();
			return {
				path: pieces.join('.'),
				file: file
			};
		});

		const grouped = _.groupBy(rows, 'path');
		this.collection = _.zipObjectDeep(Object.keys(grouped), Object.values(grouped));
	}

	/**
	 * Add a top-level item
	 * @param name
	 * @param path
	 */
	addBranch(name: string, path: string): void {
		this.tree.push({
			name: name,
			path: path,
			children: []
		});
	}

	/**
	 * Add a child item collection
	 * @param branchPath
	 * @param twigName
	 * @param twigPath
	 * @param leaves
	 */
	addTwig(branchPath: string, twigName: string, twigPath: string, leaves: Leaf[]) {
		const branch = (this.tree.find(aBranch => aBranch.path === branchPath) as Branch);
		if(branch && branch.children) {
			branch.children.push({
				name: twigName,
				path: twigPath,
				children: leaves
			});
		}
		else {
			console.error(`Problem adding twig ${twigName} to branch ${branchPath}`);
		}
	}

	/**
	 * Add a child item
	 * @param branchPath
	 * @param twigPath
	 * @param leaf
	 */
	addLeaf(branchPath: string, leaf: Leaf, twigPath?: string) {
		const branch = (this.tree.find(aBranch => aBranch.path === branchPath) as Branch);
		const twig = branch.children.find(aTwig => aTwig.path === twigPath) as Twig;
		if(twig && twig.children) {
			twig.children.push(leaf);
		}
		else if(branch && branch.children) {
			branch.children.push(leaf);
		}
		else {
			console.error(`Problem adding leaf ${leaf.name} (${leaf.path}) to twig ${twigPath}`);
		}
	}

	growTree() {
		// Add the known top-level items
		Object.keys(this.collection).map(name => {
			this.addBranch(titleCase(name), name);
		});

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const tx = this;

		_.map(this.collection, function (items: Twig[] | RawLeaf[], branchPath) {
			// zipObjectDeep seems to cause the phenomenon of an array with a mixture of number and string keys
			// (this structure is broadly intended as I want string keys for items with children, but it being an object is an anomaly)
			// JS Array.length only recognises the numerically indexed items, but Object.keys finds all the keys,
			// so we can compare these to detect the presence of string keys and handle them
			if ((items as Twig[]).length !== Object.keys(items).length) {
				Object.entries(items).map(twig => {
					const twigPath = twig[0];
					const twigLeaves: unknown = twig[1];
					// String key
					if(isNaN(_.toNumber(twigPath))) {
						if(Array.isArray(twigLeaves)) {
							tx.addTwig(branchPath, titleCase(twigPath), twigPath, twigLeaves.map(oneLeaf => {
								return {
									name: oneLeaf.file === 'index.md' ? '' : titleCase(oneLeaf.file.replace('.md', '')),
									path: oneLeaf.file === 'index.md' ? '' : oneLeaf.file.replace('.md', '')
								};
							}));
						}
						else {
							// @ts-ignore
							if(twigLeaves.file) {
								const oneLeaf: RawLeaf = twigLeaves as unknown as RawLeaf;
								tx.addLeaf(branchPath,{
									name: oneLeaf.file === 'index.md' ? '' : titleCase(oneLeaf.file.replace('.md', '')),
									path: oneLeaf.file === 'index.md' ? '' : oneLeaf.file.replace('.md', '')
								});
							}
						}
					}
					// Number key
					else {
						const oneLeaf: RawLeaf = twigLeaves as unknown as RawLeaf;
						tx.addLeaf(branchPath,{
							name: oneLeaf.file === 'index.md' ? '' : titleCase(oneLeaf.file.replace('.md', '')),
							path: oneLeaf.file === 'index.md' ? '' : oneLeaf.file.replace('.md', '')
						});
					}
				});
			}
			else {
				(items as RawLeaf[]).forEach(oneLeaf => {
					tx.addLeaf(branchPath,{
						name: oneLeaf.file === 'index.md' ? '' : titleCase(oneLeaf.file.replace('.md', '')),
						path: oneLeaf.file === 'index.md' ? ''  :oneLeaf.file.replace('.md', '')
					});
				});
			}
		});

		return this.tree;
	}
}
