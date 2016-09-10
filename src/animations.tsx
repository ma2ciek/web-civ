import * as React from 'react';

export class FadeAnimate extends React.Component<{}, {}> {
    public render() {
        return (
            <React.addons.CSSTransitionGroup
                transitionName='fade'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                { this.props.children }
            </React.addons.CSSTransitionGroup>
        );
    }
} 