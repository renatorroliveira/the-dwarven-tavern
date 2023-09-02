import { NavigateFunction, useNavigate } from 'react-router-dom';

import TopNavigation, { TopNavigationProps } from '@cloudscape-design/components/top-navigation';

import { APP_ROUTES_FOR_PAGES } from '@src/routes/constants';

import { BaseNavigationDetail, CancelableEventHandler } from '@cloudscape-design/components/internal/events';
import { LOGIN_STATUS_CACHE_KEY } from '@src/service/auth/constants';
import { useLonginStatus } from '@src/service/operations';
import { useCallback } from 'react';
import { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown/interfaces';

// TODO Implement proper dynamic top nav.
function TopNav() {
    const navigate = useNavigate();
    const loginStatus = useLonginStatus();
    const { data } = loginStatus;

    const onFollow = useCallback(getOnFollow(navigate), [navigate]);

    const OnUserMenuItemClick: CancelableEventHandler<ButtonDropdownProps.ItemClickDetails> = useCallback(
        (event) => {
            if (event.detail.id === 'signout') {
                localStorage.removeItem(LOGIN_STATUS_CACHE_KEY);
                loginStatus.refetch();
                navigate(APP_ROUTES_FOR_PAGES.HOME);
            }
        },
        [navigate, loginStatus.refetch],
    );

    return (
        <TopNavigation
            identity={{
                href: APP_ROUTES_FOR_PAGES.HOME,
                title: 'The Dwarven Tavern',
            }}
            utilities={[
                ...((data
                    ? [
                          {
                              type: 'button',
                              text: 'Link',
                              href: 'https://example.com/',
                              external: true,
                              externalIconAriaLabel: ' (opens in a new tab)',
                          },
                          {
                              type: 'button',
                              iconName: 'notification',
                              title: 'Notifications',
                              ariaLabel: 'Notifications (unread)',
                              badge: true,
                              disableUtilityCollapse: false,
                          },
                          {
                              type: 'menu-dropdown',
                              iconName: 'settings',
                              ariaLabel: 'Settings',
                              title: 'Settings',
                              items: [
                                  {
                                      id: 'settings-org',
                                      text: 'Organizational settings',
                                  },
                                  {
                                      id: 'settings-project',
                                      text: 'Project settings',
                                  },
                              ],
                          },
                          {
                              type: 'menu-dropdown',
                              text: data.displayName,
                              description: data.email,
                              iconName: 'user-profile',
                              items: [
                                  { id: 'profile', text: 'Profile' },
                                  { id: 'preferences', text: 'Preferences' },
                                  { id: 'signout', text: 'Sign out' },
                              ],
                              onItemClick: OnUserMenuItemClick,
                          },
                      ]
                    : [
                          {
                              type: 'button',
                              variant: 'primary-button',
                              text: 'Sign-in',
                              href: APP_ROUTES_FOR_PAGES.SIGNIN,
                              onFollow,
                          },
                          {
                              type: 'button',
                              text: 'Sign-up',
                              href: APP_ROUTES_FOR_PAGES.SIGNUP,
                              onFollow,
                          },
                      ]) as TopNavigationProps.Utility[]),
            ]}
        />
    );
}

export default TopNav;

function getOnFollow(navigate: NavigateFunction): CancelableEventHandler<BaseNavigationDetail> {
    return (event) => {
        event.preventDefault();
        navigate(event.detail.href!);
    };
}
