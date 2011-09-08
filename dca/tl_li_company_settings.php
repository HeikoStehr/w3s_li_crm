<?php if (!defined('TL_ROOT')) die('You cannot access this file directly!');

/**
 * PHP version 5
 * @copyright  Liplex Webprogrammierung und -design Christian Kolb 2011
 * @author     Christian Kolb <info@liplex.de>
 * @license    MIT (see /LICENSE.txt for further information)
 */

/**
 * Customer settings
 */
$this->loadLanguageFile('tl_member');
$GLOBALS['TL_DCA']['tl_li_company_settings'] = array
(

	// Config
	'config' => array
	(
		'dataContainer'               => 'File',
		'closed'                      => true
	),

	// Palettes
	'palettes' => array
	(
		'default'                     => '{company_legend}, li_crm_company_name, li_crm_company_tax_number;{address_legend}, li_crm_company_street, li_crm_company_postal, li_crm_company_city, li_crm_company_country, li_crm_company_phone, li_crm_company_fax;{bank_legend}, li_crm_account_number, li_crm_bank_code, li_crm_bank;'
	),

	// Fields
	'fields' => array
	(
		'li_crm_company_name' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_li_company_settings']['li_crm_company_name'],
			'inputType'               => 'text',
			'eval'                    => array('tl_class'=>'w50')
		),
		'li_crm_company_tax_number' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_li_company_settings']['li_crm_company_tax_number'],
			'inputType'               => 'text',
			'eval'                    => array('tl_class'=>'w50')
		),
		'li_crm_company_street' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_member']['street'],
			'inputType'               => 'text',
			'eval'                    => array('mandatory'=>true, 'maxlength'=>255, 'tl_class'=>'w50'),
		),
		'li_crm_company_postal' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_member']['postal'],
			'inputType'               => 'text',
			'eval'                    => array('mandatory'=>true, 'maxlength'=>32, 'tl_class'=>'w50'),
		),
		'li_crm_company_city' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_member']['city'],
			'inputType'               => 'text',
			'eval'                    => array('mandatory'=>true, 'maxlength'=>255, 'tl_class'=>'w50'),
		),
		'li_crm_company_country' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_member']['country'],
			'inputType'               => 'select',
			'options'                 => array_keys($this->getCountries()),
			'reference'               => $this->getCountries(),
			'eval'                    => array('mandatory'=>true, 'includeBlankOption'=>true, 'tl_class'=>'w50'),
		),
		'li_crm_company_phone' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_member']['phone'],
			'inputType'               => 'text',
			'eval'                    => array('maxlength'=>64, 'rgxp'=>'phone','tl_class'=>'w50'),
		),
		'li_crm_company_fax' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_member']['fax'],
			'inputType'               => 'text',
			'eval'                    => array('maxlength'=>64, 'rgxp'=>'phone', 'tl_class'=>'w50'),
		),
		'li_crm_account_number' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_li_company_settings']['li_crm_account_number'],
			'inputType'               => 'text',
			'eval'                    => array('maxlength'=>64, 'rgxp'=>'digit', 'tl_class'=>'w50'),
		),
		'li_crm_bank_code' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_li_company_settings']['li_crm_bank_code'],
			'inputType'               => 'text',
			'eval'                    => array('maxlength'=>64, 'rgxp'=>'digit', 'tl_class'=>'w50'),
		),
		'li_crm_bank' => array
		(
			'label'                   => &$GLOBALS['TL_LANG']['tl_li_company_settings']['li_crm_bank'],
			'inputType'               => 'text',
			'eval'                    => array('maxlength'=>64, 'tl_class'=>'w50'),
		)
	)
);