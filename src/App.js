import React from 'react';
// import classes from './App.module.css';
import Footer from './UI/Footer';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';

function App() {
    return (
        <React.Fragment>
            <PathfindingVisualizer />
            <Footer />
        </React.Fragment>
    );
}

export default App;
