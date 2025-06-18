import { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const handlePageClick = useCallback(
    (index) => () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePage(index);
      setApiURL(pages[index]);

      window.history.pushState(null, '', pages[index].search);
    },
    [pages, setActivePage, setApiURL]
  );

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);

      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [info, apiURL]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {pages[activePage - 1] && (
        <>
          {activePage - 1 !== 0 && (
            <>
              <Page onClick={handlePageClick(0)}>« First</Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}

          <Page onClick={handlePageClick(activePage - 1)}>{activePage}</Page>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {pages[activePage + 1] && (
        <>
          <Page onClick={handlePageClick(activePage + 1)}>
            {activePage + 2}
          </Page>

          {activePage + 1 !== pages.length - 1 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={handlePageClick(pages.length - 1)}>Last »</Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.medium};
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active, theme }) => active && `color: ${theme.colors.green}`};

  &:hover {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;
