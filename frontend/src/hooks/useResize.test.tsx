import { render, renderHook } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { useResize } from './useResize';

function TestElement() {
	return (<div data-testid="TestElement">Test content</div>);
}

describe('useResize', () => {
	const { container } = render(<TestElement />);
	const element: HTMLElement | undefined = container.querySelector('[data-testid="TestElement"]') as HTMLElement || undefined;
	const testRef: MutableRefObject<HTMLElement | undefined> = {
		current: element
	};
	const mockResult = { width: 0, height: 0 };
	const mockObserve = jest.fn();

	beforeEach(() => {
		global.ResizeObserver = jest.fn().mockImplementation(() => ({
			observe: mockObserve.mockImplementation((element) => {
				mockResult.width = element.scrollWidth;
				mockResult.height = element.scrollHeight;
			})
		}));
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('calls the observer', () => {
		renderHook(() => useResize(testRef as MutableRefObject<HTMLElement>, []));

		expect(mockObserve).toHaveBeenCalledWith(element);
	});

	it('gets width and height', () => {
		jest.spyOn(element, 'scrollHeight', 'get').mockReturnValue(30);
		jest.spyOn(element, 'scrollWidth', 'get').mockReturnValue(30);

		renderHook(() => useResize(testRef as MutableRefObject<HTMLElement>, []));

		expect(mockResult).toEqual({ width: 30, height: 30 });
	});

	it('detects size change', () => {
		jest.spyOn(element, 'scrollHeight', 'get').mockReturnValue(30);
		jest.spyOn(element, 'scrollWidth', 'get').mockReturnValue(30);

		const { rerender } = renderHook(() => useResize(testRef as MutableRefObject<HTMLElement>, []));

		expect(mockResult).toEqual({ width: 30, height: 30 });

		jest.spyOn(element, 'scrollHeight', 'get').mockReturnValue(50);
		jest.spyOn(element, 'scrollWidth', 'get').mockReturnValue(50);
		rerender();

		expect(mockResult).toEqual({ width: 50, height: 50 });

		expect(mockObserve).toHaveBeenCalledTimes(2);
	});
});
