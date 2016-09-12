import * as React from 'react';

export class Menu extends React.Component<{}, {}> {
    private mapWidth = 20;
    private mapHeight = 20;
    private players = 2;


    public render() {
        return (
            <div className='menu'>
                <div>
                    <h2>Continue playing</h2>
                </div>
                <div>
                    <h2>Start new game</h2>
                    <input value={this.mapWidth} type='number' onChange={e => this.mapWidth = +(e.target as HTMLInputElement).value} />
                    <input value={this.mapHeight} type='number' onChange={e => this.mapHeight = +(e.target as HTMLInputElement).value} />
                    <input value={this.players} type='number' onChange={e => this.players = +(e.target as HTMLInputElement).value} />
                </div>
            </div>
        );
    }
}