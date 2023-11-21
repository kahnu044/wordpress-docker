import PanelArea from '../../../../components/panel-area';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';
import IconPicker from '../../../../components/icon-picker';
import IconStyles from './components/icon-styles';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import getDeviceType from '../../../../utils/get-device-type';
import FlexControl from '../../../../components/flex-control';
import UnitControl from '../../../../components/unit-control';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import getAttribute from '../../../../utils/get-attribute';

export default function IconControls( { attributes, setAttributes } ) {
	const { id, supports: { icon: iconSupport } } = useContext( ControlsContext );

	const device = getDeviceType();
	const {
		icon,
		iconLocation,
		iconLocationTablet,
		iconLocationMobile,
		removeText,
	} = attributes;

	return (
		<PanelArea
			title={ __( 'Icon', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'icons' ) }
			className="gblocks-panel-label"
			id={ `${ id }Icon` }
		>
			{ 'Desktop' === device &&
				<>
					<IconPicker
						attributes={ attributes }
						setAttributes={ setAttributes }
						attrIcon={ 'icon' }
						attrRemoveText={ 'removeText' }
						attrAriaLabel={ 'ariaLabel' }
						id={ id }
					/>

					{ !! icon && ! removeText &&
						<IconStyles
							attributes={ attributes }
							setAttributes={ setAttributes }
							iconLocation={ iconLocation }
							locationOptions={ iconSupport.location }
							onChangeLocation={ ( value ) => {
								setAttributes( {
									iconLocation: value,
									iconPaddingRight: 'inline' === value || 'left' === value ? '0.5' : '',
									iconPaddingBottom: 'above' === value ? '0.5' : '',
									iconPaddingLeft: 'right' === value ? '0.5' : '',
								} );
							} }
						/>
					}
				</>
			}

			{ 'Tablet' === device && !! icon && ! removeText &&
				<IconStyles
					attributes={ attributes }
					setAttributes={ setAttributes }
					iconLocation={ iconLocationTablet }
					locationOptions={ iconSupport.location }
					onChangeLocation={ ( value ) => {
						setAttributes( {
							iconLocationTablet: value,
							iconPaddingRightTablet: 'inline' === value || 'left' === value ? '0.5' : '',
							iconPaddingBottomTablet: 'above' === value ? '0.5' : '',
							iconPaddingLeftTablet: 'right' === value ? '0.5' : '',
						} );
					} }
				/>
			}

			{ 'Mobile' === device && !! icon && ! removeText &&
				<IconStyles
					attributes={ attributes }
					setAttributes={ setAttributes }
					iconLocation={ iconLocationMobile }
					locationOptions={ iconSupport.location }
					onChangeLocation={ ( value ) => {
						setAttributes( {
							iconLocationMobile: value,
							iconPaddingRightMobile: 'inline' === value || 'left' === value ? '0.5' : '',
							iconPaddingBottomMobile: 'above' === value ? '0.5' : '',
							iconPaddingLeftMobile: 'right' === value ? '0.5' : '',
						} );
					} }
				/>
			}

			{ !! icon && !! iconSupport.iconSize &&
				<FlexControl>
					<UnitControl
						id="gblocks-icon-width"
						label={ __( 'Icon Size', 'generateblocks' ) }
						value={ getAttribute( 'width', { attributes: attributes.iconStyles, deviceType: device } ) }
						placeholder={ getResponsivePlaceholder( 'width', attributes.iconStyles, device ) }
						onChange={ ( value ) => {
							setAttributes( {
								iconStyles: {
									[ getAttribute( 'width', { attributes: attributes.iconStyles, deviceType: device }, true ) ]: value,
									[ getAttribute( 'height', { attributes: attributes.iconStyles, deviceType: device }, true ) ]: value,
								},
							} );
						} }
					/>
				</FlexControl>
			}
		</PanelArea>
	);
}
