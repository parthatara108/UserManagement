import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ITEMS_PER_PAGE } from '../app/constants'

export default function Pagination({ handlePage, page, setPage, totalItems }) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <div
                    onClick={() => page > 1 && handlePage(page - 1)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </div>
                <div
                    onClick={() => page < totalPages && handlePage(page + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}<span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> -{' '}<span className="font-medium">{Math.min(page * ITEMS_PER_PAGE, totalItems)}</span>{' '}of{' '}<span className="font-medium">{totalItems}</span> Results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex  -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <div
                            onClick={() => page > 1 && handlePage(page - 1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5 cursor-pointer" aria-hidden="true" />
                        </div>
                        {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
                            (ele, index) => (
                                <div
                                    key={index}
                                    onClick={() => handlePage(index + 1)}
                                    aria-current="page"
                                    className={`relative z-10 cursor-pointer inline-flex border-2 border-gray-300 items-center ${index + 1 === page ? 'bg-indigo-600 text-white' : ' bg-white text-black'} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                >
                                    {index + 1}
                                </div>
                            )
                        )}

                        <div
                            onClick={() => page < totalPages && handlePage(page + 1)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5 cursor-pointer" aria-hidden="true" />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}