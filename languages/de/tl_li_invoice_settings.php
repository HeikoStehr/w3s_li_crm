<?php if (!defined('TL_ROOT')) die('You cannot access this file directly!');

/**
 * PHP version 5
 * @copyright  Liplex Webprogrammierung und -design Christian Kolb 2011
 * @author     Christian Kolb <info@liplex.de>
 * @license    MIT (see /LICENSE.txt for further information)
 */

/**
 * Fields
 */
$GLOBALS['TL_LANG']['tl_li_invoice_settings']['li_crm_invoice_number_generation']       = array('Generierung der Rechnungsnummer', 'Bitte geben Sie die Kombination von Insert-Tags und Text ein, durch die eine Rechnungsnummer generiert werden soll. Mit {{countInvoices::x}} wird die aktuelle Anzahl der Ausgangsrechnungen ausgegeben. Der x-Wert bestimmt auf wie viele Stellen die Rechnungsnummer mit Nullen aufgefüllt werden soll.');
$GLOBALS['TL_LANG']['tl_li_invoice_settings']['li_crm_invoice_number_generation_start'] = array('Rechnungsnummer Start', 'Bitte geben Sie die Zahl ein, bei der der Rechnungszähler startet. Dadurch können Sie die Nummern z. B. ab 100 starten lassen.');

/**
 * Legends
 */
$GLOBALS['TL_LANG']['tl_li_invoice_settings']['invoice_number_legend'] = 'Rechnungsnummer';

/**
 * Reference
 */
$GLOBALS['TL_LANG']['tl_li_invoice_settings']['edit']   = 'Rechnungseinstellungen bearbeiten';

?>