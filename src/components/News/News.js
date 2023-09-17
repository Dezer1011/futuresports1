import React from 'react';
import './News.css'
const News = () => {
    const articles = [
        { title: "Team Alpha Wins the Championship!", content: "Team Alpha defeated Team Bravo in a thrilling match to win the FutureSports Championship." },
        { title: "FutureSports Announces New Youth Program", content: "FutureSports is launching a youth program to nurture the next generation of sports talents." },
        { title: "New Partnership with SportGear Inc.", content: "FutureSports has entered a strategic partnership with SportGear Inc. to enhance athlete performance." },
        { title: "Athlete of the Year: Sarah Johnson", content: "Sarah Johnson has been named FutureSports Athlete of the Year for her outstanding performance." },
        { title: "Upcoming FutureSports Summit", content: "The annual FutureSports Summit will bring together experts, athletes, and fans to discuss the future of sports." },
        { title: "Expansion of FutureSports Scholarship Program", content: "FutureSports is expanding its scholarship program, offering more opportunities for young talents." },
        { title: "Virtual Reality Training Introduced", content: "FutureSports is embracing technology with the introduction of Virtual Reality training for athletes." },
        { title: "Community Outreach: Sports for All", content: "FutureSports launches a community outreach program to promote sports inclusivity and well-being." },
        { title: "Historic Victory for Team Delta", content: "Team Delta achieved a historic victory, marking their 100th win in FutureSports' premier league." },
        { title: "FutureSports App Update Released", content: "The latest update to the FutureSports app delivers enhanced features and performance improvements." }
    ];

    return (
        <div id="news-section">
            <div id="news" className="clearfix"></div>
            <section>
                <h2>Latest News</h2>
                {articles.map((article, index) => (
                    <article key={index}>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default News;
