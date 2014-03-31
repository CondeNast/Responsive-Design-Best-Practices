Responsive Design Best Practices
================================

Hey! So you want to go responsive? I’m proud of you. There is a lot of info out there, so let’s see how to get started!

### First, what is responsive design?

Being responsive allows you to use the same code to serve different platforms and devices, which reduces the amount of requests made to fetch resources. A mobile-first approach is trending heavily now, which forces you to approach the development and design of a website from the smallest to largest view, giving you a broader perspective than a traditional desktop site. 

### So how do we do this?

This repo contains example files of a non-responsive file (CM-offer.html) converted to responsive (CM-offer-responsive.html). This file is used for promotion of subscription offers for Bon Appetit, and is stored in a template via a promotion system called Circules. Ideally you begin the process with responsive in mind, but this example shows how to convert an existing page to a responsive design.

What you'll see is all the inline styles and same-page `<style>` moved to an external file. We've reduced the unnecessary HTML and updated the classes to be more self-describing in nature. We've also created a new JS object (CN.offers) that serves to abstract the functions of the page and increase visibility and reduce redundant code. Sounds crazy? Keep reading and we'll explain everything!


### The sky is the limit.

We'll cover the basics that will get you started down the responsive path, which include separating styling from markup using Cascading Style Sheets (CSS), lean and concise HyperText Markup Language (HTML) and object-oriented Javascript (JS).

Let's start with HTML!

## HTML

Let's think of building a responive webpage as building a new Brownstone. I love Brownstones. The HTML can be thought of as the frame, a representation of a technical drawing without any firm dimensions. It's the support we build on and around and really doesn't change that much throughout the process. Because of this, and costs, we want only have whats necessary to support our house and floors. That's what we mean by lean HTML; unique IDs and consistent, self-described classes that signify the roles of the element without bloat. Minimilistic markup keeps the weight down and makes construction a lot easier and transparent.

Less is more. Only include elements that you need! If you see elements without CSS or JS applied to them, condense the code and get rid of unneccessary markup. For example, if you have JS attached the `a` click event

```
<div class="container"><div><a class="has-JS-attached" href="#"><button>Click me!</button></a></button></div></div>

```
consider making it.

```
<button class="container has-JS-attached">Click me!</button>

```
See how minimalistic you can get!

Follow common markup practices! The most common is to create a container (or wrapper!) element, with header, main content and footer elements within. This is the beginning of our zen house frame.

```
<body>
	<div id="wrapper">
		<div id="header"></div>
		<div id="content"></div>
		<div id="footer"></div>
	</div>
</body>
```


The wrapper around everything will come in handy later as we add rules for different devices and need to adjust the width of all the markup. IDs describe a unique “section” and can only be used once (breaks JS and CSS if you use it more than once). Classes can and should be reused, and make up different parts of that section. This allows us to reuse style code, and JS event binding efficiently. The header and footer navigation sections are examples of when to use an ID, with the links inside sharing the common classes. This way we can individually target a unique link and also style and bind both the header and footer links. In our example pages, the different steps of the subscribe pages each have unique IDs but share common classes.

```
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
		<div class="step-details">
		...
		</div>
	</div>
</div>
```

This is why planning is important because reducing redunancy and creating transparency alleviates pain when in the later stages. So if HTML is the framework, where do we look for the exact dimensions of the house or the colors of walls? The blueprint and design plan: CSS.

## CSS

CSS is extremely powerful, and with it we can create wildly different designs using the same foundation with ease. Check out <a href="http://www.csszengarden.com">CSS Zen Garden</a> as an example of what people can do with the same HTML and only changing the CSS. This is why having a clear idea of mobile to desktop is important ahead of time; it allows the developer to plan and create as simple a blueprint as necessary based on a zen HTML foundation. In our Brownstone example, the CSS let's us change the number of floors, increase and decrease widths, all sorts of things that we couldn't do in real life using the same frame, but in the digital world we do and see everyday.

### Step up your style game

Inline styles!? Move those bad boys into semantically fresh stylesheets and take advantage of cascading power! (Cascading is the Machiavellian approach of overwriting previous styles with new ones later in the document, which comes in handy for responsive as we’ll see). The reason we shy away from inline is because it’s separate from the rest of the code and harder to debug. It also acts as the final rule and overrides any code in the stylesheets.

In addition the more specific you are with your declarations the more precise you have to be overwriting them. So if you use parent classes for one style and want to change the rule for mobile, you have to be just as precise. Take a look at a piece from our code:

```
#step1 .step-details #offer-2 {
	margin-left:33px;
	background-position: -489 -44;
}

...

@media screen and (max-width : 768px) {

	#step1 .step-details #offer-2 {
		margin-left: 23px;
	}
}

```

The first declaration sets the style for desktop. Then in a media query we overwrite it for everything that is smaller than 768px in width.

The one instance you can supercede a previous rule without matching the class structure is by using the “!important” declaration.

```
#step1 .step-details #offer-2 {
	margin-left:33px;
	background-position: -489 -44;
}

...

#step1 #offer-2 {
	margin-left: 23px !important;
}
```


You’ve probably heard of LESS and SASS, which are great tools for larger projects with lots of nested styles. They also allow you to use variables and some computations and need to be compiled ahead of time (browsers can’t read .less or .sass files). We won’t need them for this project, but I personally like LESS.


## Images

There is still a lot of debate on how to handle images in a responsive format. That 2000x2000 background looks great on a desktop but crushes your load time on a mobile device. Still, there are things we can do to optimize the site across devices.

The most important style for responsive images is max-width. Check this out:

```
img { max-width: 100%; }
```

This tells the image to be as big as it’s container, until it’s natural size is met. So that 768x568 image scales down to 500px when it’s parent container is 500px! So handy. Just remember to set its parent container’s width explicitly.

Speaking of background images, how do we get them to scale? Use background-size baby! 

```
body { background-size: contain; }
```

Similar to max-width, this style makes the background fluid and respond to the varying widths of the devices.

Another thing we need to overcome is iOS resizing the page automatically. To overcome this and make the page respond responsively, we need to adjust how the browser sees the widths of the images. Adding this to the `<head>` will compensate!

```
<meta name="viewport" content="width=device-width; initial-scale=1.0">
```

Lastly, using sprites is a great way to minimize server requests for images, but we encounter trouble when using them as background images as the `background-size: contain` uses the entire image and won't allow us to scale just the section we like.


## Media Queries

These are the golden switches which magically change the look and feel of our responsive page. If this was literally a housebuilding project we would have to use magic to make this happen. Whether it’s a fluid design or multi-column, a responsive website needs to be told how to react to the different widths of their viewports. The most popular and useful way is through media queries, which allow us to specify a block of code for specific instances. If we want to hide the navbar only on mobile devices with widths smaller than 380px, we would use a media query to make that happen.

```
@media screen and (max-width : 380px) {
	#navbar { display : none; }
}
```
Using multiple media queries allow us to target specific ranges of widths, which translates to devices. These cascade just like regular styles, so we can overwrite previous styles. We can also combine them in a single declaration.

```
/* iPhone portrait */
@media screen and (min-width : 320px) {
}

/* iPhone landscape */
@media screen and (min-width : 380px) {
	#navbar { display : none; }
}
```

We can also specify resolution

```
@media (-webkit-min-device-pixel-ratio: 2) { 
    /* Retina-specific stuff here */
}
```

orientation
```
@media (min-width: 700px) and (orientation: landscape) { ... }
```
and have multiple queries
```
@media all and (max-width: 699px) and (min-width: 520px), (min-width: 1151px) {
  body {
    background: #ccc;
  }
}
```
There are a lot of tutorials online, so we won’t go in depth here, but with responsive design I’ve encountered two main philosophies: Create breakpoints per device or per design. What this means is you can code for an iPhone or iPad like above, where you know the width. But with new devices coming out all the time, I believe the best approach is to come up with a fluid design that molds itself to any screen width. This creates media queries with different max and min widths that aren’t linked to devices but rather to the design.


## Frameworks

Twitter created the now-famous Bootstrap framework which utilizes leading edge CSS3/HTML5/JS to create a mobile-first approach to responsive design. They make it easy to have responsive column layouts based on a grid structure where the page is divided into 12 columns, either using set widths or percentages. Each column can then span any number of columns up to 12, giving flexibility to the overall column width. Then the container class is triggered by media queries and adjusts the overall width, with each column being automatically adjusted. It’s best to see an example.

http://getbootstrap.com/css/

## Libraries

Don’t recreate the responsive wheel! Take advantage of what’s out there to help your project.

Reset browser defaults!

http://meyerweb.com/eric/tools/css/reset/

Use Modernizr to see what features and capabilities are present with your current environment!

http://modernizr.com/

#### Browser plugins

<a href="https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh">Window Resizer</a> for Google Chrome.


## Javascript

Want to take that responsive design to the next level? Use some Javascript and make that puppy more robust. Combine “data” HTML5 attributes with some code and you can specify low and hi res images.

```
<img src=”...jpg” data-hi-res=”...@2x.jpg” />
```

Another thing to remember is click events behave differently on touch screens than via the traditional mouse clicks. Touch events are best bound through touch declarations. Using an event handling library will help, or a creative binding hierarch, but plan a strategy to avoid double events and sluggish behavior.

https://coderwall.com/p/bdxjzg

```
$(‘.link’).on('click touchstart touchmove touchend', function(e){
```

## Other notes

Responsive design eliminates redirections and subdomains that we see when using solutions like Mobify, reduces redundant code, and makes maintenance a lot easier. The additional planning and strategy time incurred in the beginning is well justified given the benefits of the responsive strategy.



### Responsive websites

Mashable is a great example of responsive design. The site still uses Wordpress too!

http://www.mashable.com

http://www.awwwards.com/websites/responsive-design/







