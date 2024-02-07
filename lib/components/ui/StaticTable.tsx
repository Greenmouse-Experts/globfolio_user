import { FC } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  TbArrowBackUp,
  TbArrowBackUpDouble,
  TbArrowForwardUp,
  TbArrowForwardUpDouble,
} from 'react-icons/tb';
import CubeLoader from './Loaders/CubeLoader/CubeLoader';

interface Props {
  data: any;
  columns: any;
  isLoading: boolean;
}
export const StaticTable: FC<Props> = ({ data, columns, isLoading }) => {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });
  return (
    <>
      {/* Table Comp */}
      {isLoading && (
        <div className="w-full py-24 flex justify-center">
          <CubeLoader size={1.1} />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col">
          <div className=" overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead className="thead-light border-y-2 border-[#CECECE]">
                  {table?.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          className="px-6 lg:px-10 align-middle py-3 fs-500 whitespace-nowrap text-left"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table?.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="align-middle fs-500 whitespace-nowrap px-6 lg:px-10 py-6 text-left border-b border-[#CECECE]"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  {table?.getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                      {footerGroup.headers.map((header) => (
                        <th key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.footer,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              </table>
              <div className="h-4" />
              {data && !data.length && (
                <p className="text-center text-lg text-[#767676] py-6">
                  No Data Available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="flex items-center justify-between px-6 border border-gray-400 py-2">
          <div className="lg:flex w-full justify-between items-center gap-2">
            <div className="flex gap-x-2">
              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  {table?.getState().pagination.pageIndex + 1} of{' '}
                  {table?.getPageCount()}
                </strong>
              </span>
              <select
                value={table?.getState().pagination.pageSize}
                onChange={(e) => {
                  table?.setPageSize(Number(e.target.value));
                }}
                className="border rounded border-black"
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-3">
              <span className="flex items-center gap-1 fw-500">
                Go to page:
                <input
                  type="number"
                  defaultValue={table?.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="border border-black p-1 rounded w-12"
                />
              </span>
              <div>
                <button
                  className="border-none rounded p-1"
                  onClick={() => table?.setPageIndex(0)}
                  disabled={!table?.getCanPreviousPage()}
                >
                  <span className="w-7 h-7 circle bg-primary text-white flex place-center hover:scale-105 duration-100">
                    <TbArrowBackUpDouble className="text-2xl" />
                  </span>
                </button>
                <button
                  className="border-none rounded p-1"
                  onClick={() => table?.previousPage()}
                  disabled={!table?.getCanPreviousPage()}
                >
                  <span className="w-7 h-7 circle bg-primary text-white flex place-center hover:scale-105 duration-100">
                    <TbArrowBackUp className="text-2xl" />
                  </span>
                </button>
                <button
                  className="border-none rounded p-1"
                  onClick={() => table?.nextPage()}
                  disabled={!table?.getCanNextPage()}
                >
                  <span className="w-7 h-7 circle bg-primary text-white flex place-center hover:scale-105 duration-100">
                    <TbArrowForwardUp className="text-2xl" />
                  </span>
                </button>
                <button
                  className="border-none rounded p-1"
                  onClick={() => table?.setPageIndex(table?.getPageCount() - 1)}
                  disabled={!table?.getCanNextPage()}
                >
                  <span className="w-7 h-7 circle bg-primary text-white flex place-center hover:scale-105 duration-100">
                    <TbArrowForwardUpDouble className="text-2xl" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
