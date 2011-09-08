<?php if (!defined('TL_ROOT')) die('You cannot access this file directly!');

/**
 * PHP version 5
 * @copyright  Liplex Webprogrammierung und -design Christian Kolb 2011
 * @author     Christian Kolb <info@liplex.de>
 * @license    MIT (see /LICENSE.txt for further information)
 */

/**
 * Table tl_li_task_status
 */
$GLOBALS['TL_DCA']['tl_li_task_status'] = array
(

	// Config
	'config' => array
	(
		'dataContainer'               => 'Table',
		'enableVersioning'            => true
	),

	// List
	'list' => array
	(
		'sorting' => array
		(
			'mode'                    => 1,
			'fields'                  => array('orderNumber'),
			'flag'                    => 11
		),
		'label' => array
		(
			'fields'                  => array('icon', 'title', 'title'),
			'format'                  => '<img src=\'%s\' alt=\'%s\' /> %s',
			'label_callback'          => array('TaskStatus', 'renderLabel'),
			'group_callback'          => array('TaskStatus', 'renderGroup'),
		),
		'global_operations' => array
		(
            'all' => array
			(
				'label'               => &$GLOBALS['TL_LANG']['MSC']['all'],
				'href'                => 'act=select',
				'class'               => 'header_edit_all',
				'attributes'          => 'onclick="Backend.getScrollOffset();"'
			)
		),
		'operations' => array
		(
			'edit' => array
			(
				'label'               => &$GLOBALS['TL_LANG']['tl_li_task_status']['edit'],
				'href'                => 'act=edit',
				'icon'                => 'edit.gif'
			),
			'copy' => array
			(
				'label'               => &$GLOBALS['TL_LANG']['tl_li_task_status']['copy'],
				'href'                => 'act=copy',
				'icon'                => 'copy.gif'
			),
			'delete' => array
			(
				'label'               => &$GLOBALS['TL_LANG']['tl_li_task_status']['delete'],
				'href'                => 'act=delete',
				'icon'                => 'delete.gif',
				'attributes'          => 'onclick="if (!confirm(\'' . $GLOBALS['TL_LANG']['MSC']['deleteConfirm'] . '\')) return false; Backend.getScrollOffset();"'
			),
			'show' => array
			(
				'label'               => &$GLOBALS['TL_LANG']['tl_li_task_status']['show'],
				'href'                => 'act=show',
				'icon'                => 'show.gif'
			)
		)
	),

	// Palettes
	'palettes' => array
	(
		'__selector__'                => array(''),
		'default'                     => '{status_legend}, title, orderNumber, icon;{settings_legend}, isTaskDisabled;'
	),

	// Subpalettes
	'subpalettes' => array
	(
		''                            => ''
	),

	// Fields
	'fields' => array
	(
        'title' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_li_task_status']['title'],
			'inputType'               => 'text',
			'eval'                    => array('mandatory'=>true, 'maxlength'=>250, 'tl_class'=>'w50')
		),
		'orderNumber' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_li_task_status']['orderNumber'],
			'inputType'               => 'text',
			'eval'                    => array('mandatory'=>true, 'maxlength'=>12, 'tl_class'=>'w50', 'rgxp'=>'digit')
		),
		'icon' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_li_task_status']['icon'],
			'inputType'               => 'fileTree',
			'eval'                    => array('fieldType'=>'radio', 'tl_class'=>'clr', 'files'=>true, 'filesOnly'=>true)
		),
		'isTaskDisabled' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_li_task_status']['isTaskDisabled'],
			'inputType'               => 'checkbox'
		)
	)
);

?>