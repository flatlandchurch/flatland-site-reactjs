import React from 'react';
import {
  PageCard,
  Jumbotron,
} from '@flatland/chokhmah';
import { Link } from 'react-router-dom';

import Progress from '../../components/progress';

import './Next.css';

export default class Next extends React.Component {
  render() {
    return (
      <div className="page-wrapper">
        <Jumbotron
          title="Find Your Next Step"
          image="https://c2.staticflickr.com/2/1972/31222348328_56f688a547_b.jpg"
        />
        <PageCard>
          <div className="card-body">
            <div className="progress-tree">
              <Progress
                title="Next Step Class"
                content="The first step in your journey at Flatland Church is our Next Step class. You'll learn about our vision and values, our core beliefs, and how you can get involved."
                externalUrl="https://flatland.churchcenter.com/groups/core-classes/07-15-2020-next-step"
                label="Sign Up"
                active
              />
              <Progress
                title="Baptism"
                content="If you are a new believer, or have never been baptized as an adult, we want to encourage you to get baptized. It's the next step for any believer and is even something that Jesus did."
              />
              <Progress
                title="Homes of Influence"
                content={<span>We want you to become an influencer within your community and your workplace. As a church, we commit to equipping you to influence your home and your neighborhood. As your next step, we want you to commit to being a home of influence by dedicating your home. <Link to="/influence">Learn More</Link></span>}
              />
              <Progress
                title="Life Group"
                content="The Christian life is not supposed to be lived in isolation. Not only that, but it's hard to move to the center of God's Kingdom alone. That's why we have life groups all over the city where you can find love, community, and friendship."
                internalUrl="/move/groups"
                label="Find a Group"
              />
              <Progress
                title="Ministry Team"
                content="Going to church on a Sunday isn't all about listening to a sermon, singing some worship tunes, and drinking free coffee. Church is meant to equip you to do ministry, both inside and outside the church. The best way to get started is to join one of our ministry teams."
              />
              <Progress
                title="Core Classes"
                content="You can't grow in your faith if you're not learning. That's why we offer a number of core classes to help you grow in your understanding of God and His Word, while also growing personally as you take this journey with Him."
                internalUrl="/move/classes"
                label="Take a Class"
              />
              <Progress
                title="Life Coaching"
                content="Like any important goal you are trying to reach, be it a weight-loss goal, a financial goal, an academic goal, it's hard to make it without a coach. Moving to the center of God's Kingdom is no different. That's why Flatland offers Spirit-led coaching to help you accomplish one of 48 life goals that range everything from personal talent to industry-related goals. We recommend you do this at least twice a year."
                internalUrl="/move"
                label="Get Coached"
              />
              <Progress
                title="Leadership"
                content="It's not enough to simply move to the center. At some point, you have to pass on what you've learned and help other poeple on their journey to the center of God's Kingdom. Leadership comes in many forms at Flatland Church, whether that's through our LEAD program, leading a ministry team, or coaching others."
              />
            </div>
          </div>
        </PageCard>
      </div>
    );
  }
}
