import React, { useState, useEffect } from 'react';
import Post from './post';
import "./feed.css"

const Feed = () => {
    return (
        <div className='allPosts'>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
    );
}

export default Feed;