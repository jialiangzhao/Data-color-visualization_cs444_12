Template for A11
------------

Author: jialiangzhao [EMAIL](jialiangzhao@email.arizona.edu)  
Date: Apri 22


## Notes
This code has four parts, and he can get the color 
through data. After getting the angle that needs to be rotated 
through data, finally we get the result we need by combining the two.
This file provides a template skeleton for visualization vector
fields using color mapping and glyphs


## Included files

* README.md - this file
* index.html - show file
* data.js - data file
* a12.js - run file
* d3.js - core file


## References
I set up a button to make the arrow move. If you don't look carefully, you will be hinted by the arrow, and you will think that the arrow is moving in the direction of the arrow. Actually no, I just designed a button that keeps him in a random position all the time. By controlling the speed of change, you will have the illusion that he is moving. At the same time, I tried Trasition() to adjust, but it will not let you have the illusion that he is moving towards the arrow. transition() will only make you feel like it is creeping.

