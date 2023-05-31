/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect, select, dispatch } from '@wordpress/data';

export const notices = (date) => {
  return () => {
    const createErrorNotice = dispatch('core/notices').createErrorNotice;
    const removeErrorNotice = dispatch('core/notices').removeNotice;
    const getNotices = select('core/notices').getNotices();

    if (!date) {
      console.warn('No date was picked.');
      useSelect, dispatch('core/editor').lockPostSaving('myprefix-no-date-meta');

      if (!getNotices.some((notice) => notice.id === 'myprefix-missing-date-meta')) {
        createErrorNotice(
          __('You need to pick-a-date before you can save this post.', 'textDomain'),
          {
            id: 'myprefix-missing-date-meta', // Unique ID
            type: 'default', // `default` is normal top bar, `snackbar` is small and at bottom
            actions: [
              {
                label: __('Learn more.', 'textDomain'),
                url: 'https://www.timeanddate.com/worldclock/',
                className: 'pants-class',
              },
            ],
          }
        );
      }
    } else if (date) {
      dispatch('core/editor').unlockPostSaving('myprefix-no-date-meta');
      removeErrorNotice('myprefix-missing-date-meta');
    }

    return () => {
      dispatch('core/editor').unlockPostSaving('myprefix-no-date-meta');
      removeErrorNotice('myprefix-missing-date-meta');
    };
  };
};
