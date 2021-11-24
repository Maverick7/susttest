import React, { Fragment } from "react";
import styles from "../../../styles/Contentbox.module.css";
let html = `<div>
<h2><strong>Accessible Education for the Blind</strong></h2>
</div>
<p>
Nunc laoreet justo sed ipsum pharetra facilisis. Donec quis fermentum nisl. Cubitur finibus ultrices felis vitae ultrices. Cras auctor blandit eros, vel dignissim diam tincid eget. Integer varius varius fringilla. Maecenas eu condimentum mauris. Phasellus sed lobortis libero. Integer eget dolor nibh. Suspendisse non neque vel ex molestie ullamcorper hendrerit id eros. Integer tincidunt dignissim faucibus. Etiam cursus tempus vulputate. In aliquet tortor nisl, a maximus massa placerat ac.
</p>
<p>
Your submission will be evaluated against the following criteria:
</p>
<ul>
<li>Innovation &amp; Creativity (20%)</li>
<li>Impact &amp; Relevance (20%)</li>
<li>Feasibility/Sustainable (20%)</li>
<li>Depth (of solution) (10%)</li>
<li>Technology (10%)</li>
</ul>
<p>
<strong>Please note:</strong><br />Once you click Submit, you won&rsquo;t be able to make any changes.
</p>
<p>
Shortlisted individuals/ teams will be notified via email communication (email address registered during account creation).
</p>
<p>
<strong>All the best in your submission!</strong>
</p>
<div>
<h2><strong>Accessible Education for the Blind</strong></h2>
</div>
<p>
Nunc laoreet justo sed ipsum pharetra facilisis. Donec quis fermentum nisl. Cubitur finibus ultrices felis vitae ultrices. Cras auctor blandit eros, vel dignissim diam tincid eget. Integer varius varius fringilla. Maecenas eu condimentum mauris. Phasellus sed lobortis libero. Integer eget dolor nibh. Suspendisse non neque vel ex molestie ullamcorper hendrerit id eros. Integer tincidunt dignissim faucibus. Etiam cursus tempus vulputate. In aliquet tortor nisl, a maximus massa placerat ac.
</p>
<p>
Your submission will be evaluated against the following criteria:
</p>
<ul>
<li>Innovation &amp; Creativity (20%)</li>
<li>Impact &amp; Relevance (20%)</li>
<li>Feasibility/Sustainable (20%)</li>
<li>Depth (of solution) (10%)</li>
<li>Technology (10%)</li>
</ul>
<p>
<strong>Please note:</strong><br />Once you click Submit, you won&rsquo;t be able to make any changes.
</p>
<p>
Shortlisted individuals/ teams will be notified via email communication (email address registered during account creation).
</p>
<p>
<strong>All the best in your submission!</strong>
</p>`;

const ContentBox = () => {
  return (
    <Fragment>
      <div className={`${styles.challenge_box_container}`}>
        <div className={`${styles.challenge_box_wrapper}`}>
          <div className={`${styles.challenge_box}`}>
          <div className={`check_label`} dangerouslySetInnerHTML={{__html: html}}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentBox;
