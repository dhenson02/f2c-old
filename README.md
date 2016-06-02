# f2c

### Fantasy Football App for [myfantasyleague.com](http://myfantasyleague.com)
 - [Express JS](http://expressjs.com/) 4.x (eventually 5.x)
 - [React](https://facebook.github.io/react/) >= 15.1.0
 - [React-Router](https://github.com/reactjs/react-router)
 - [Relay](https://facebook.github.io/relay)
 - [GraphQL](http://graphql.org/)
 - [Babel](http://babeljs.io/) >= 6
 - [Kube CSS Framework](https://imperavi.com/kube/)

and plenty more (see package.json for details).

## Requirements

 - [node](https://nodejs.org) I'm using **>= 5.5.0**, so I suggest using that

### Semi-Requirements (if you want to use my npm scripts - see **package.json**)

 - screen - `sudo apt-get install screen`

## Pre-setup

#### Requires a bit of manual labor.  Most of it can be done by running:

```bash
./grab-all
```

However, some of these require different parameters (week and/or player number).  Those that don't have this requirement will be filled correctly.  The others can be obtained with:

```bash
./grab $TYPE $WEEK $PLAYER
    # ... as many times as necessary
./extract $TYPE # $TYPE is optional here
```

`extract.sh` cleans up the JSON that is returned because it does some unnecessary nesting and adds extra data I don't need.

## Setup

```bash
npm install
cp config.json.blank config.json  # ...edit with your settings
npm run build  # or build-dist, watch, or watch-dist
npm start
```

## Who this is for

Players and commissioners of [My Fantasy League](http://www.myfantasyleague.com/) teams/leagues.

## Credits

Please give credit to any of the authors of the attributed packages in the package.json file appropriately.  They all work very hard and deserve some extra traffic :)

## License

The MIT License (MIT)

Copyright (c) 2016 Deryck Henson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
