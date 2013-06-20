jquery.updown.js
================

jQuery plugin for keyboard navigating lists

## Install

```
bower install updown --save
```

## Usage

**HTML**

```HTML

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
