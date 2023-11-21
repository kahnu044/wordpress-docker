<?php

$gutenslide_attributes = array(
  'gsBlockId' => array(
    'type' => 'string',
  ),
  'background' => array(
    'type' => 'object',
    'default' => array(),
  ),
  'isEditable' => array(
    'type' => 'boolean',
    'default' => true,
  ),
  'mediaUrl' => array(
    'type' => 'string',
    'source' => 'attribute',
    'selector' => '.slide-bg img, .slide-bg video',
    'attribute' => 'src',
  ),
  'mediaAlt' => array(
    'type' => 'string',
    'source' => 'attribute',
    'selector' => '.slide-bg img',
    'attribute' => 'alt',
    'default' => '',
  ),
  'mediaType' => array(
    'type' => 'string',
  ),
  'mediaId' => array(
    'type' => 'number',
  ),
  'overlayColor' => array(
    'type' => 'string',
    'default' => '',
  ),
  'dimRatio' => array(
    'type' => 'number',
    'default' => 0.5,
  ),
  'rgbaBackground' => array(
    'type' => 'string',
    'default' => '',
  ),
  'initialized' => array(
    'type' => 'boolean',
    'default' => false,
  ),
  'linkUrl' => array(
    'type' => 'string',
    'default' => '',
  ),
  'verticalAlign' => array(
    'type' => 'string',
    'default' => 'center',
  ),
  'contentPosition' => array(
    'type' => 'string',
    'default' => 'center',
  ),
  'autoCaption' => array(
    'type' => 'string',
    'default' => 'none',
  ),
  'minWidth' => array(
    'type' => 'string',
    'default' => '80%',
  ),
  'mixBlendMode'      => array(
    'type'    => 'string',
    'default' => 'none',
  ),
  'opensInNewTab' => array(
    'type' => 'boolean',
    'default' => false,
  ),
  'hashId' => array(
    'type' => 'string',
		'default' => '',
  ),
	'isHidden' => array(
		'type' => 'boolean',
		'default' => false,
	),
	'fetchPriority' => array(
		'type' => 'boolean',
		'default' => false,
	)
);
