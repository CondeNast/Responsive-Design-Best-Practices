Responsive-Design-Best-Practices
================================

Hey! So you want to go responsive? I’m proud of you. There is a lot of info out there, so let’s see how to get started!

First, what is responsive design?

Being responsive allows you to use the same code to serve different platforms and devices, which reduces the amount of requests made to fetch resources. A mobile-first approach is trending heavily now, which forces you to approach the development and design of a website from a broader perspective than a traditional desktop site. So how do we do this?

The basics:

HTML

Start by creating lean HTML markup with unique IDs and classes that help describe the role of the element. 

Less is more. Only include elements that you need! 

Follow common markup practices! Create a container (or wrapper!) element, with header, main content and footer elements within.

IDs usually describe a unique “section”, and classes make up different parts of that section. Navigation is a unique section. The different steps of the subscribe pages each have unique IDs but share common classes.

<code>
<div id="step1" class="steps unfolded">
	<div class="step-header">
	...
	</div>
	<div class="step-body">
		<div class="step-details">
		...
		</div>
	</div>
</div>
<div id="step2" class="steps folded">
	<div class="step-header">
	...
	</div>
	<div class="step-body">
		...	

</code>

CSS

Inline styles!? Move those bad boys into semantically fresh stylesheets and take advantage of cascading power! (Cascading is the Machiavellian approach of overwriting previous styles with new ones later in the document, which comes in handy for responsive as we’ll see). The reason we shy away from inline is because it’s separate from the rest of the code and harder to debug. It also acts as the final rule and overrides any code in the stylesheets.

In addition the more specific you are with your declarations the more precise you have to be overwriting them. So if you use parent classes for one style and want to change the rule for mobile, you have to be just as precise.


#step1 .step-details #offer-2 {
	margin-left:33px;
	background-position: -489 -44;
}

...

#step1 .step-details #offer-2 {
	margin-left: 23px;
}


The one instance you can supercede a previous rule without matching the class structure is by using the “!important” declaration.


#step1 .step-details #offer-2 {
	margin-left:33px;
	background-position: -489 -44;
}

...

#step1 #offer-2 {
	margin-left: 23px !important;
}



You’ve probably heard of LESS and SASS, which are great tools for larger projects with lots of nested styles. They also allow you to use variables and some computations and need to be compiled ahead of time (browsers can’t read .less or .sass files). We won’t need them for this project, but I personally like LESS.


Images

There is still a lot of debate on how to handle images in a responsive format. That 2000x2000 background looks great on a desktop but crushes your load time on a mobile device. Still, there are things we can do to optimize the site across devices.

The most important style for responsive images is max-width. Check this out:

img { max-width: 100%; }

This tells the image to be as big as it’s container, until it’s natural size is met. So that 768x568 image scales down to 500px when it’s parent container is 500px! So handy. Just remember to set its parent container’s width explicitly.

Speaking of background images, how do we get them to scale? Use background-size baby! 

body { background-size: contain; }

Similar to max-width, this style makes the background fluid and respond to the varying widths of the devices.

Another thing we need to overcome is iOS resizing the page automatically. To overcome this and make the page respond responsively, we need to adjust how the browser sees the widths of the images. Adding this to the <head> will compensate!


<meta name="viewport" content="width=device-width; initial-scale=1.0">


Media Queries

Whether it’s a fluid design or multi-column, a responsive website needs to be told how to react to the different widths of their viewports. The most popular and useful way is through media queries, which allow us to specify a block of code for specific instances. If we want to hide the navbar only on mobile devices with widths smaller than 380px, we would use a media query to make that happen.

@media screen and (max-width : 380px) {
	#navbar { display : none; }
}

Using multiple media queries allow us to target specific ranges of widths, which translates to devices. These cascade just like regular styles, so we can overwrite previous styles. We can also combine them in a single declaration.

/* iPhone portrait */
@media screen and (min-width : 320px) {
}

/* iPhone landscape */
@media screen and (max-width : 380px) {
	#navbar { display : none; }
}

There are a lot of tutorials online, so we won’t go in depth here, but with responsive design I’ve encountered two main philosophies: Create breakpoints per device or per design. What this means is you can code for an iPhone or iPad like above, where you know the width. But with new devices coming out all the time, I believe the best approach is to come up with a fluid design that molds itself to any screen width. This creates media queries with different max and min widths that aren’t linked to devices but rather to the design.


Frameworks

Twitter created the now-famous Bootstrap framework which utilizes leading edge CSS3/HTML5/JS to create a mobile-first approach to responsive design. They make it easy to have responsive column layouts based on a grid structure where the page is divided into 12 columns, either using set widths or percentages. Each column can then span any number of columns up to 12, giving flexibility to the overall column width. Then the container class is triggered by media queries and adjusts the overall width, with each column being automatically adjusted. It’s best to see an example.

http://getbootstrap.com/css/

Libraries

Don’t recreate the responsive wheel! Take advantage of what’s out there to help your project.

Reset browser defaults!

http://meyerweb.com/eric/tools/css/reset/

Use Modernizr to see what features and capabilities are present with your current environment!

http://modernizr.com/


Javascript

Want to take that responsive design to the next level? Use some Javascript and make that puppy more robust. Combine “data” HTML5 attributes with some code and you can specify low and hi res images.

<img src=”...jpg” data-hi-res=”...@2x.jpg” />

Another thing to remember is click events behave differently on touch screens than via the traditional mouse clicks. Touch events are best bound through touch declarations. Using an event handling library will help, or a creative binding hierarch, but plan a strategy to avoid double events and sluggish behavior.

https://coderwall.com/p/bdxjzg

$(‘.link’).on('click touchstart touchmove touchend', function(e){


Other notes

Responsive design eliminates redirections and subdomains that we see when using solutions like Mobify, reduces redundant code, and makes maintenance a lot easier. The additional planning and strategy time incurred in the beginning is well justified given the benefits of the responsive strategy.





Responsive websites

Mashable is a great example of responsive design. The site still uses Wordpress too!

http://www.mashable.com

http://www.awwwards.com/websites/responsive-design/







