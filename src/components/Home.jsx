import React, { Component } from 'react';

export default class Home extends Component {

    render() {
        return (
            <div className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex justify-center">
                        <img src="https://appseries.azurewebsites.net/static/media/seriestv.e0b0894681a8624917c1.jpg" alt="imagen cartelera" className="max-w-full h-auto rounded-lg shadow-md" />
                    </div>
                </div>
            </div>
        );
    }
}
