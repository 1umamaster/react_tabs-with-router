import React from 'react';
import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Tab } from '../types/Tab';

interface TabsPageProps {
  tabs: Tab[];
}

export const TabsPage: React.FC<TabsPageProps> = ({ tabs }) => {
  const location = useLocation();
  const params = useParams();

  const getActiveTabId = (): string | null => {
    if (params.tabId && tabs.some(tab => tab.id === params.tabId)) {
      return params.tabId;
    }

    for (const tab of tabs) {
      if (location.pathname.endsWith(`/${tab.id}`)) {
        return tab.id;
      }
    }

    return null;
  };

  const activeTabId = getActiveTabId();

  return (
    <>
      <h1 className="title">Tabs page</h1>

      <div className="tabs is-boxed">
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.id}
              data-cy="Tab"
              className={classNames({
                'is-active': activeTabId === tab.id,
              })}
            >
              <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="block" data-cy="TabContent">
        {activeTabId
          ? tabs.find(tab => tab.id === activeTabId)?.content
          : 'Please select a tab'}
      </div>
    </>
  );
};
