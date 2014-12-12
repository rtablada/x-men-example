# Express Test

This is just a playground for me to mess about with various things with Express.

## Current Agenda

1. Clean Up Startup

The first thing that really bugged me coming into Express was how the convention is to have a huge `app.js` file that does all of your bootstrapping for your app.
I mean, this really bugged me, just after 2 little bits of middleware, a mongoose connection, and an extra view engines: the app.js file became unwieldy!
Things were mucking about and my file had about 12 require statements.

So far, I've moved various groups of components to their own file within a `bootstrap` directory.
This has cut my `app.js` to a readable and organized 12 lines (with spacing).

2. Organize Routes as Controllers

Out of the box, Express comes with a `routes` directory, which has files for each route group that is later registered with the application.
It works, but `routes` doesn't quite feel the right word for things.

While I realize that they aren't really controllers since they do not share an identity as an instantiated object, I do feel controller is a bit of a better term for these files.
To manage this, I renamed the `routes` directory to `controllers`.

Along with this, I needed a way to have all of my route registration in one place, so I created a `routes.js` file to be my main entry point into registering application routes.

3. Break Out HTTP

While 90% of what my application will be doing is responding to HTTP requests, I still wanted to move my `HTTP` logic into its own directory to keep it mentally separate from future domain logic.
This now includes:

```
http
|--/controllers/
|  |--/index.js
|  |--/users.js
|--/routes.js
```

4. Load Models

I'm still at a bit of a loss about what to do for loading my models.
I don't want to put it in the project bootstrap since IMO that directory should stay the same unless new middlewares or domain layers are introduced.
I've thought about an autoloader like [requireindex](https://github.com/stephenhandley/requireindex), but I'm not sure that I want the cost of extra file reads just to boot up the app.
So... I'm looking for suggestions!
