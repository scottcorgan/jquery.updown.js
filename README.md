jquery.updown.js
================

jQuery plugin for keyboard navigating lists

Current Version: **0.2.1**

## Install

```
bower install updown --save
```

## Usage

**HTML**

```HTML

<!-- Include script -->
<script src="path/to/jquery.updown.js"></script>

<!-- Trigger -->
<input type="text" id="list-search">

<!-- Targeted element -->
<ul id="list">

  <!-- Items -->
  <li class="list-item">List Item 1</li>
  <li class="list-item">List Item 2</li>
  <li class="list-item">List Item 3</li>
  <li class="list-item">List Item 4</li>
  <li class="list-item">List Item 5</li>
</ul>

```

**Javascript**

```javascript

$('#list').updown({
  trigger: '#list-search',
  item: '.list-item',
  highlightClass:  'key-hightlight',
  onSelect: function ($element) {
    // This is triggered when you hit the Enter key
  }
});

```

## Options

* ` trigger ` - the element to active the up/down arrows and enter key events for navigating the list
* ` item ` - the selector for the items to navigate. A class of ` ud-selected ` is added to the item by default when item is hightlighted (for styling purposes).
* ` hightlightClass ` - classname to add to list item element when it is highlighted. This overwrites the ` ud-selected ` class name.
* ` onSelect ` - callback function when the enter key is pressed to select that list item. Passes the element as a jQuery object to the callback.

## Todo

* Add callback for when on item highlight change
* Add support for custom keyboard shortcuts to navigate the list

## Changelog

**0.2.1**
* FIXED: namespaced class ` ud-selected ` for highlighted list item
* FIXED: bind events to dynamic DOM elements

**0.1.0**
* Initial setup
* Bower install support
* Basic usage
