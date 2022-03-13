import React from 'react';
import { useRouter } from 'next/router';
import { capitalize, join } from 'lodash';
import { Tooltip } from '@nextui-org/react';
import { Box } from '@primitives';
import BugIcon from '../icons/bug';
import { ISSUE_REPORT_URL } from '../../lib/github/constants';

const BugReportButton = () => {
  const router = useRouter();

  const slug = router.query.slug || '';

  const componentTitle = Array.isArray(slug)
    ? join(
        slug.map((s) => capitalize(s)),
        '/'
      )
    : capitalize(slug);
  const linkHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: `${ISSUE_REPORT_URL}${componentTitle}`
    }).click();
  };

  return (
    <Tooltip
      hideArrow
      content="Report a bug"
      triggerCss={{
        cursor: 'pointer',
        ml: '$2',
        '&:hover': {
          opacity: 0.8
        }
      }}
    >
      <Box
        as="a"
        title="Report a bug"
        rel="noopener noreferrer"
        target="_blank"
        onClick={linkHandler}
        href={`${ISSUE_REPORT_URL}${componentTitle}`}
      >
        <BugIcon size={20} fill="var(--nextui-colors-codeCopyIconColor)" />
      </Box>
    </Tooltip>
  );
};

export default BugReportButton;
