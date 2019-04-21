import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

const TabHeader = styled.div`
	width: 100%;
	display: flex;
	margin-top: 16px;
  border-bottom: 1px solid #dedede;
  padding: 0 16px;
  box-sizing: border-box;
`;

const TabLabel = styled.div`
	margin-right: 8px;
  font-weight: 600;
  font-size: 12px;
  color: #959595;
  position: relative;
  cursor: pointer;
  padding: 12px;
  
  &:hover,
  &:focus {
    background: #dedede66;
    outline: none;
  }
  
  &.active {
    color: #000;
    
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 4px;
      background: #048ba8;
      position: absolute;
      left: 0;
      bottom: -1px;
    }
  }
  
  &.notif::after {
    content: "";
    width: 6px;
    height: 6px;
    background: #DB3A34;
    display: block;
    position: absolute;
    top: 4px;
    right: 0;
    border-radius: 50%;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const TabBody = styled.div`
	width: 95%;
	color: rgba(0,0,0,.75);
	font-size: 21px;
	font-weight: 300;
	letter-spacing: -.5px;
	line-height: 28px;
	margin-bottom: 24px;
	margin-left: auto;
	margin-right: auto;
	
	@media screen and (max-width: 1024px) {
		width: 90%;
		font-size: 19px;
		letter-spacing: -.42px;
		line-height: 25px;
	}
`;

const changeTab = (id) => {
	window.history.pushState({}, '', `?tab=${id}`);
};

export default ({ tabs = [], activeTabId, onChange }) => {
	const tabContent = tabs.find(({ id }) => id === activeTabId).content;

	return (
		<div>
			<TabHeader>
				{
					tabs.map((tab) => (
						<TabLabel
							role="button"
							className={cx({
								active: tab.id === activeTabId,
								notif: tab.hasNotif,
							})}
							tabIndex={0}
							key={tab.id}
							onClick={() => {
								changeTab(tab.id);
								onChange(tab.id);
							}}
							onKeyDown={({ key }) => key === 'Enter' && onChange(tab.id)}
						>
							{tab.label}
						</TabLabel>
					))
				}
			</TabHeader>
			<TabBody>
				{tabContent}
			</TabBody>
		</div>
	);
}
