import { FC, use, useTransition } from 'react';

import { PaginatedResponse, Task } from 'src/shared/api';

interface PaginationProps {
  tasksPaginated: Promise<PaginatedResponse<Task[]>>;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  tasksPaginated,
  onPageChange,
}) => {
  const { last, first, next, prev, pages, page } = use(tasksPaginated);

  const [isLoading, startTransition] = useTransition();

  const handlePageChange = (page: number): void => {
    startTransition(() => onPageChange(page));
  };

  return (
    <nav className="flex items-center px-3 justify-between">
      <div className="grid grid-cols-4 gap-2">
        <button
          disabled={isLoading}
          onClick={() => handlePageChange(first)}
          className="px-3 py-2 rounded-l"
        >
          First ({first})
        </button>
        {prev && (
          <button
            disabled={isLoading}
            onClick={() => handlePageChange(Number(prev))}
            className="px-3 py-2 r"
          >
            Prev ({prev})
          </button>
        )}
        {next && (
          <button
            disabled={isLoading}
            onClick={() => handlePageChange(Number(next))}
            className="px-3 py-2 "
          >
            Next ({next})
          </button>
        )}
        <button
          disabled={isLoading}
          onClick={() => handlePageChange(last)}
          className="px-3 py-2 rounded-r"
        >
          Last ({last})
        </button>
      </div>
      <span className="text-sm text-center">
        Page: {page} of {pages}
      </span>
    </nav>
  );
};
