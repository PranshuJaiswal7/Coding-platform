import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { LessonContainer } from '../components';
import { lessonData } from '../data';

const Dashboard = () => {
  // If the user is not logged in, redirect to the login page
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  // get the user's data from the server
  const { data } = useQuery(QUERY_ME);
  // set the user's data to a variable
  const user = data?.me || {};

  useEffect(() => {
    // Dynamically load the Botpress scripts
    const botpressScript1 = document.createElement('script');
    botpressScript1.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    document.head.appendChild(botpressScript1);

    const botpressScript2 = document.createElement('script');
    botpressScript2.src = 'https://mediafiles.botpress.cloud/4ffea5b3-df9d-42b6-ab1f-7ed8020e18f2/webchat/config.js';
    botpressScript2.defer = true;
    document.head.appendChild(botpressScript2);

    // Clean up the dynamically added scripts on component unmount
    return () => {
      document.head.removeChild(botpressScript1);
      document.head.removeChild(botpressScript2);
    };
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  return (
    <section id="dashboard" className="w-full min-h-screen p-4 md:p-8">
      <h1 className="h1-style mb-8">Dashboard</h1>
      {/* Banner */}
      <div className="mb-8 banner-container-style text-white text-shadow bg-gradient-to-r from-purple-600 to-pink">
        <div className="relative p-8 z-10">
          <h2 className="banner-heading mb-3">Welcome {user.username}!</h2>
          <p className="text-lg">Your adventure begins here</p>
        </div>
        <div className="banner-bg-style bg-parkay-floor" />
      </div>
      <div className="mb-8">
        <p>
          These quizzes are intended to aid you in practicing the skill you've learned{' '}
          <strong>Ascend: An Integrated Platform in Trumio</strong>.
        </p>
        <br />
        <p>Select an exercise from a lesson to begin a quiz.</p>
      </div>

      <h3 className="font-bold mb-4 text-xl">Skills</h3>
      {/* Lessons */}
      <div className="flex flex-col gap-4">
        {lessonData.map((lesson) => (
          <LessonContainer key={lesson.lessonUrl} lesson={lesson} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;