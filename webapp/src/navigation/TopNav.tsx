import { NavigateFunction, useNavigate } from 'react-router-dom';

import TopNavigation, { TopNavigationProps } from '@cloudscape-design/components/top-navigation';

import { APP_ROUTES_FOR_PAGES } from '@src/routes/constants';

import { BaseNavigationDetail, CancelableEventHandler } from '@cloudscape-design/components/internal/events';
import { useLonginStatus } from '@src/service/operations';
import { useCallback } from 'react';

// TODO Implement proper dynamic top nav.
function TopNav() {
    const navigate = useNavigate();
    const loginStatus = useLonginStatus();
    const isLoggedIn = !!loginStatus.data;

    const onFollow = useCallback(getOnFollow(navigate), [navigate]);

    return (
        <TopNavigation
            identity={{
                href: APP_ROUTES_FOR_PAGES.HOME,
                title: 'The Dwarven Tavern',
            }}
            utilities={[
                ...((isLoggedIn
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
                              text: 'Customer Name',
                              description: 'email@example.com',
                              iconName: 'user-profile',
                              items: [
                                  { id: 'profile', text: 'Profile' },
                                  { id: 'preferences', text: 'Preferences' },
                                  { id: 'security', text: 'Security' },
                                  {
                                      id: 'support-group',
                                      text: 'Support',
                                      items: [
                                          {
                                              id: 'documentation',
                                              text: 'Documentation',
                                              href: '#',
                                              external: true,
                                              externalIconAriaLabel: ' (opens in new tab)',
                                          },
                                          { id: 'support', text: 'Support' },
                                          {
                                              id: 'feedback',
                                              text: 'Feedback',
                                              href: '#',
                                              external: true,
                                              externalIconAriaLabel: ' (opens in new tab)',
                                          },
                                      ],
                                  },
                                  { id: 'signout', text: 'Sign out' },
                              ],
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
