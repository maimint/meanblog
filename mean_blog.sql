-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u1build0.15.04.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 04, 2016 at 05:12 PM
-- Server version: 5.6.28-0ubuntu0.15.04.1
-- PHP Version: 5.6.4-4ubuntu6.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mean_blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
`id_post` int(10) unsigned NOT NULL,
  `post_title` text NOT NULL,
  `post_desc` text NOT NULL,
  `date_registered` int(10) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id_post`, `post_title`, `post_desc`, `date_registered`) VALUES
(16, 'Node.js Foundation Announces Keynotes', 'With 4 million users a month and adoption across numerous industries, Node.js is emerging as a universal platform used for web applications, IoT, enterprise application development and microservice architectures. This marquee event attracts enterprise users, developers and community stakeholders, providing them with a unique opportunity for cross-disciplinary discussions that are aimed to provide new insights and new opportunities around Node.js development.', 4294967295),
(17, 'AngularJS 2 reaches release candidate', 'Google engineer Brad Green, who has worked on the project, said Angular 2 will have support for offline compilation. "This improves the first-time render performance of Angular 2 by about 2x and allows us to drop much of our framework size when you build for production," he said', 4294967295),
(19, 'Understanding AngularJS $q service and promises', 'What is a promise?\n\nA promise in the Javascript and AngularJS world is an assurance that we will get a result from an action at some point in the future, let’s see the two possible results of a promise:\n\nA promise is said to be fulfilled when we get a result from that action (meaning that we get a response, regardless of whether the response is good or bad)\nA promise is said to be rejected when we don’t get a response(for instance if we were retrieving some data from an API and for some reason we never got a response because the API endpoint was down etc.)\nWhy do we need promises?\n\nWe need promises because we need to make decisions based on the possible results of our call (or the possibility that we don’t get a response from that call at all), probably an example will better help describe this:\n\nOur program contacts an external API to get the list of clients\nwhile the response is received the program works on something else\nOnce the response is received (if received) the program displays the client info on the screen\nIf the response was not received (the API was down) then we display a message to the end user.\nHere is a really good example of what promises are and it’s explained as cartoon\n\nUsing Angular’s $q service to deal with promises\n\nAngular JS provides a service called $q which allows you to work with asynchronous functions and user their return values when the execution has been completed, and what its really cool about it is that it will let you write your custom promises as well (so you can resolve or reject a promise when appropriate)', 4294967295),
(20, '$apply and $digest Explored', 'AngularJS offers an incredibly awesome feature known as two way data binding which greatly simplifies our lives. Data binding means that when you change something in the view, the scope model automagically updates. Similarly, whenever the scope model changes, the view updates itself with the new value. How does does AngularJS do that? When you write an expression ({{aModel}}), behind the scenes Angular sets up a watcher on the scope model, which in turn updates the view whenever the model changes. This watcher is just like any watcher you set up in AngularJS:\n\nThe second argument passed to $watch() is known as a listener function, and is called whenever the value of aModel changes. It is easy for us to grasp that when the value of aModel changes this listener is called, updating the expression in HTML. But, there is still one big question! How does Angular figure out when to call this listener function? In other words, how does AngularJS know when aModel changes so it can call the corresponding listener? Does it run a function periodically to check whether the value of the scope model has changed? Well, this is where the $digest cycle steps in.', 4294967295),
(21, 'The difference between services and factories', 'Okay, so what is the difference between a service and a factory in AngularJS? As we all know, we can define a service like this:.service() is a method on our module that takes a name and a function that defines the service. Pretty straight forward. Once defined, we can inject and use that particular service in other components, like controllers, directives and filters, like this:Again, .factory() is a method on our module and it also takes a name and a function, that defines the factory. We can inject and use that thing exactly the same way we did with the service. Now what is the difference here?\nWell, you might see that instead of working with this in the factory, we’re returning an object literal. Why is that? It turns out, a service is a constructor function whereas a factory is not. Somewhere deep inside of this Angular world, there’s this code that calls Object.create() with the service constructor function, when it gets instantiated. However, a factory function is really just a function that gets called, which is why we have to return an object explicitly.\nTo make that a bit more clear, we can simply take a look at the Angular source code. Here’s what the factory() function looks like:', 4294967295);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
 ADD PRIMARY KEY (`id_post`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
MODIFY `id_post` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
