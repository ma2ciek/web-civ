import * as React from 'react';

// TODO - initialization screen
export class Menu extends React.Component<{}, {}> {
    private mapWidth = 20;
    private mapHeight = 20;
    private players = 2;


    public render() {
        return (
            <div className='menu'>
                <div>
                    <h2>Start new game</h2>
                    <input type='number'
                        value={this.mapWidth.toString()}
                        onChange={e => this.mapWidth = +(e.target as HTMLInputElement).value} />
                    <input type='number'
                        value={this.mapHeight.toString()}
                        onChange={e => this.mapHeight = +(e.target as HTMLInputElement).value} />
                    <input type='number'
                        value={this.players.toString()}
                        onChange={e => this.players = +(e.target as HTMLInputElement).value} />
                </div>
            </div>
        );
    }
}