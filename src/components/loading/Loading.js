import React from 'react';
import styled from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styled.loader}>
  <h1> Loading Awesome</h1>
  <div className={styled.b1}></div>
  <div className={styled.b2}></div>
  <div className={styled.b3}></div>
</div> 

    /* <div className={styled.loading}>
  <div className={styled.dot}></div>
  <div className={styled.dot}></div>
  <div className={styled.dot}></div>
  <div className={styled.dot}></div>
  <div className={styled.dot}></div>
</div>  */

    //         <body>
    //     <div className={styled.main}>
    //         <div className={styled.shadowWrapper}>
    //             <div className={styled.shadow}></div>
    //         </div>
    //         <div className={styled.dragon}>
    //             <div className={styled.body}></div>
    //             <div className={styled.hornLeft}></div>
    //             <div className={styled.hornRight}></div>
    //             <div className={styled.eyeLeft}></div>
    //             <div className={styled.eyeRight}></div>
    //             <div className={styled.blushLeft}></div>
    //             <div className={styled.blushRight}></div>
    //             <div className={styled.mouth}></div>
    //             <div className={styled.tailSting}></div>
    //         </div>
    //         <div className={styled.fireWrapper}>
    //             <div className={styled.fire}></div>
    //         </div>
    //         <div className={styled.progress}>
    //             <div className={styled.outer}>
    //                 <div className={styled.inner}></div>
    //             </div>
    //         </div>
    //     </div>
    // </body>
  );
};

export default Loading;
