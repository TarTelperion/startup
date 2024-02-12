# Elevator Pitch

Have you *ever* felt abandoned by your muse? Like all of a sudden, ***all*** of your inspiration was drained from your head, and bottled, used by some unseen writer simply for amusement? Have you ever wished  you could just pound out *part* of a story, and have the rest finished for you? 

...well.

I may have a solution for you.

In Writer's Block, you can join with a group of friends to co-author a story. Set your word goal, your goal for words per session, and then choose your friends. Then you're set! Writer's Block will generate a set of five random words as your prompt, and then the first author will be randomly selected to write. When they hit their goal, the next person will be notified. They can read the most recent set of writing, and add theirs. And the torch is passed.

Choose your adventure,
choose your story.

### Design
![An image of the layout of my startup](design1of2.jpg)
![Images continued](design2of2.jpg)

### Key Features

- Secure login and user saving
- Ability to link friends to your account
- Team story production
- Automatic prompt generation
- Fair turn taking
- Board of popular stories

### Technologies

The following technologies will be utilized in my design

- **HTML** - Scaffolds other technologies with correct use of HTML. Also builds separate pages for signup, popular stories, current story, and about page.
- **CSS** - Adds good design and responsive design with slight animations.
- **JavaScript** - Allows for login, user input data, backend calls, and interactive design.
- **Service** - Backend services allow for:
    - Login
    - Text saving
    - Popular story saving
    - Turn taking
    - Saving friends
- **DB/Login** - Stores users, saves text, allows for only registered users to add to stories.
- **WebSocket** - When a user hits their turn count, an email notification is sent to the next person in the chain.
- **React** - Application adjusted to use React. 

### HTML Deliverable

In this deliverable I designed an HTML structure for the following:

- **HTML Pages** - I built ten HTML pages for the basic flow of the webpage, including a profile and writing page, with others such as login and error.
- **Links** - All pages link to other pages though hyperlinked text. Login is initialized on first entry, but is not accessible unless you log out. 
- **Text** - Descriptions for technologies and proper use is outlined through text that is placed throughout the website.
- **Images** - Image placed on the about page as a placeholder for a javascript image library.
- **DB/Login** - Login placed at beginning of website. Placeholders shown throuhout the website for saved names and information from the database such as trending stories.
- **Websocket** - Nudging players is done through notifications sent to profile page. Also updates on stories are sent to both email and notification board on profile.

### CSS Deliverable

In this deliverable I styled the webpage using CSS, and did the following. 

- **Header, Footer, and main content body** -- I used CSS to build a cohesive design throuhgout all elements.
- **Navigation Elements** -- I designed a navigation bar to fit the theme of the website with custom hover colors and wrapped the links in flex divs.
- **Responsiveness** -- This bad boy can handle anything except possibly an apple watch. It looks great and preforms even better due to flexbox and some epic web hooks.
- **Application Elements** -- Elements of the application are properly colored and designed to make UI easy to navigate and easier to look at.
- **Application fonts** -- I took the liberty of employing two of my all time favorite fonts in this website to make typing and writing a pleasurable experience.
- **Application Images** -- Images were scaled and moved to become a part of the overall body, and added a svg logo image that resizes dynamically on otherwise boring pages.
 

