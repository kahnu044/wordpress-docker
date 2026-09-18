/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ExternalLink } from '@wordpress/components';
import { useState } from '@wordpress/element';
/**
 * External dependencies
 */
import { saveEBSettingsData } from '@essential-blocks/controls';

const Facebook = ( props ) => {
	const { setTrigger, settingsKey, settingsData, setSettingsData } = props;
	const [ apikey, setApiKey ] = useState( settingsData[ settingsKey ] );
	// Page ID is a sibling global setting (Instagram-style "connect once").
	const [ pageId, setPageId ] = useState( settingsData.facebookPageId || '' );
	const [ saveBtnText, setSaveBtnText ] = useState(
		__( 'Save Changes', 'essential-blocks' )
	);
	const [ error, setError ] = useState( '' );

	const handleClick = () => {
		setSaveBtnText( __( 'Saving…', 'essential-blocks' ) );
		Promise.all( [
			saveEBSettingsData( settingsKey, apikey ),
			saveEBSettingsData( 'facebookPageId', pageId ),
		] )
			.then( ( results ) => {
				const ok = results.every( ( raw ) => {
					try {
						return JSON.parse( raw ).success;
					} catch ( e ) {
						return false;
					}
				} );

				if ( ok ) {
					setSaveBtnText( __( 'Saved', 'essential-blocks' ) );
					setSettingsData( {
						...settingsData,
						[ settingsKey ]: apikey,
						facebookPageId: pageId,
					} );

					setTimeout( () => {
						setTrigger( false );
					}, 300 );
				} else {
					setSaveBtnText( __( 'Save Changes', 'essential-blocks' ) );
					setError(
						__(
							'Something went wrong! Please try again.',
							'essential-blocks'
						)
					);
				}
			} )
			.catch( () => {
				setSaveBtnText( __( 'Save Changes', 'essential-blocks' ) );
				setError(
					__(
						'Something went wrong! Please try again.',
						'essential-blocks'
					)
				);
			} );
	};

	return (
		<div className="option-modal-content">
			<h3 className="option-modal__title">
				{ __( 'Connect Facebook Page', 'essential-blocks' ) }
			</h3>
			<p className="option-modal__content">
				{ __(
					'To display posts from your Facebook Page, paste a long-lived Page Access Token and the Page ID below. ',
					'essential-blocks'
				) }
				{ __( 'Follow the ', 'essential-blocks' ) }
				<ExternalLink href="https://developers.facebook.com/docs/pages-api/getting-started">
					{ __(
						'Pages API getting-started guide',
						'essential-blocks'
					) }
				</ExternalLink>
				{ __(
					' to generate a token with the pages_show_list and pages_read_engagement scopes, then paste and save.',
					'essential-blocks'
				) }
			</p>

			<div className="eb-form-control">
				<label htmlFor="eb-fb-token">
					{ __( 'Page Access Token', 'essential-blocks' ) }
				</label>
				<input
					type="text"
					id="eb-fb-token"
					className="eb-input-control"
					placeholder={ __(
						'Paste your Facebook Page access token',
						'essential-blocks'
					) }
					value={ apikey && 'undefined' !== apikey ? apikey : '' }
					onChange={ ( e ) => setApiKey( e.target.value ) }
				/>
			</div>

			<div className="eb-form-control">
				<label htmlFor="eb-fb-page-id">
					{ __( 'Page ID', 'essential-blocks' ) }
				</label>
				<input
					type="text"
					id="eb-fb-page-id"
					className="eb-input-control"
					placeholder={ __(
						'e.g. 1234567890 or your @page-handle',
						'essential-blocks'
					) }
					value={ pageId && 'undefined' !== pageId ? pageId : '' }
					onChange={ ( e ) => setPageId( e.target.value ) }
				/>
			</div>

			<button
				className="eb-btn eb-btn-border eb-btn-sm"
				onClick={ () => handleClick() }
			>
				{ saveBtnText }
			</button>
			{ error && (
				<div>
					<span className="error">{ error }</span>
				</div>
			) }
		</div>
	);
};

export default Facebook;
