import { ToggleControl } from '@wordpress/components';
import { sprintf } from '@wordpress/i18n';
import SelectPostType from '../../../../../extend/dynamic-content/components/SelectPostType';
import SimpleSelect from '../../../../../components/simple-select';
import AuthorsSelect from '../../../../../components/authors-select';
import { CategoriesSelect, TagsSelect } from '../../../../../components/taxonomies-select';
import RemoveButton from './RemoveButton';
import TaxonomyParameterControl from '../controls/TaxonomyParameterControl';
import PostTypeRecordsSelect from '../../../../../components/post-type-records-select';
import DateTimePicker from '../controls/DateTimePicker';
import DebouncedTextControl from '../../../../../components/debounced-text-control';
import SimpleMultiSelect from '../../../../../components/simple-multi-select';
import { isArray, isObject } from 'lodash';

const getParameterControl = ( parameterType ) => {
	switch ( parameterType ) {
		case 'text':
		case 'number':
			return DebouncedTextControl;
		case 'postTypeSelect':
			return SelectPostType;
		case 'select':
			return SimpleSelect;
		case 'multiSelect':
			return SimpleMultiSelect;
		case 'authorsSelect':
			return AuthorsSelect;
		case 'categoriesSelect':
			return CategoriesSelect;
		case 'tagsSelect':
			return TagsSelect;
		case 'taxonomySelect':
			return TaxonomyParameterControl;
		case 'postsSelect':
			return PostTypeRecordsSelect;
		case 'dateTimePicker':
			return DateTimePicker;
		case 'toggleControl':
			return ToggleControl;
	}
};

export default function ControlBuilder( props ) {
	const {
		id,
		type,
		label,
		description,
		selectOptions = [],
		isSticky,
		value,
		default: defaultValue,
		onChange,
		onClickRemove,
		dependencies,
		placeholder,
	} = props;

	const Control = getParameterControl( type );
	let controlDescription = description;

	if ( 'per_page' === id && ( '-1' === value || parseInt( value ) > parseInt( generateBlocksInfo.queryLoopEditorPostsCap ) ) ) {
		controlDescription += ' ' + sprintf(
			'Editor only: A maximum of %s posts can be previewed in the editor.',
			generateBlocksInfo.queryLoopEditorPostsCap
		);
	}

	const defaultValuePlaceholder = !! defaultValue && ( ! isArray( defaultValue ) || ! isObject( defaultValue ) )
		? defaultValue
		: undefined;

	const controlPlaceholder = placeholder || defaultValuePlaceholder;

	return (
		<div className={ 'gblocks-parameter-component' }>
			<Control
				id={ id }
				type={ type }
				label={ label }
				help={ controlDescription }
				options={ selectOptions }
				value={ value }
				placeholder={ controlPlaceholder }
				onChange={ onChange }
				{ ...dependencies }
			/>
			{ ! isSticky && <RemoveButton id={ id } onClick={ onClickRemove } /> }
		</div>
	);
}
