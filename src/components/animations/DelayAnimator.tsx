import * as React from 'react';

interface DelayAnimatorProps {
    appearDelay: number;
    show: boolean;
    Animator: React.ComponentClass<{}>;
}

export class DelayAnimator extends React.Component<DelayAnimatorProps, { active: boolean }> {
    private timer: number;

    public constructor() {
        super();
        this.state = { active: false };
    }

    public componentWillMount() {
        if (this.props.show)
            this.showTooltipAfterTimeout();
    }

    public componentWillUnmount() {
        clearTimeout(this.timer);
    }

    public componentWillReceiveProps(props: DelayAnimatorProps) {
        this.setState({ active: false });

        if (props.show)
            this.showTooltipAfterTimeout();
    }

    private showTooltipAfterTimeout() {
        clearTimeout(this.timer);
        (this as any).timer = setTimeout(() => {
            this.setState({ active: true });
        }, this.props.appearDelay);
    }

    public render() {
        const { Animator } = this.props;
        return (
            <Animator>
                {this.state.active ? this.props.children : []}
            </Animator>
        );
    }
}