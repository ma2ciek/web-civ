import * as React from 'react';
import * as CSSTransitionGroup from 'react-addons-css-transition-group';
import './fade.scss';

interface FadeProps {
    children: React.ReactChild;
}

export const Fade = ({ children }: FadeProps) => (
    <CSSTransitionGroup
        component='g'
        transitionName='fade'
        transitionAppear={true}
        transitionLeave={true}
        transitionEnter={true}
        transitionAppearTimeout={300}
        transitionLeaveTimeout={150}
        transitionEnterTimeout={300}>
        {children}
    </CSSTransitionGroup>
);
