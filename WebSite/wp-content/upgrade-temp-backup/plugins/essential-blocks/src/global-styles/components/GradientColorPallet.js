/**
 * Dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import {
    Popover,
    Dashicon,
    GradientPicker,
    ColorIndicator,
    PanelRow,
    TextControl
} from "@wordpress/components";

const GradientColorPallet = (props) => {
    const {
        title = "",
        colors,
        setColor,
        setColors,
        wrapperClass,
        resetAction,
        deleteAction,
        enableEditName = false,
        onDelete
    } = props

    const [clickedGradient, setClickedGradient] = useState('');
    const [gradientPopoverAnchor, setGradientPopoverAnchor] = useState();

    const editColorName = (index, value) => {
        let cloneColors = [...colors]
        cloneColors[index] = {
            ...cloneColors[index],
            name: value
        }
        setColors([...cloneColors])
    }

    return (
        <>
            {colors && colors.length > 0 && (
                <div className={`eb-color-panel ${wrapperClass}`}>
                    <PanelRow className="eb-gradient-color-label">{title}</PanelRow>
                    <div className="eb-custom-panel eb-gradient-color-list">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                ref={setGradientPopoverAnchor}
                                id={`eb-gradient-color-${index}`}
                                className="eb-custom-element eb-custom-color-item"
                            >
                                <div
                                    className="item-content"
                                    onClick={() => !enableEditName && setClickedGradient(clickedGradient === color.slug ? '' : color.slug)}
                                >
                                    <ColorIndicator
                                        onClick={() => setClickedGradient(clickedGradient === color.slug ? '' : color.slug)}
                                        colorValue={color?.color}
                                    />
                                    {enableEditName && (
                                        <TextControl
                                            className={'eb-custom-element__edit-input'}
                                            value={color.name || ''}
                                            onChange={(text) => editColorName(index, text)}
                                        />
                                    )}
                                    {!enableEditName && (
                                        color?.name
                                    )}
                                </div>
                                <div className="actions">
                                    {resetAction && (
                                        <span
                                            className={'eb-reset'}
                                            title="Reset"
                                            onClick={() => setColor(index, 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(155, 81, 224) 100%)')}
                                        ><Dashicon icon={'image-rotate'} /></span>
                                    )}
                                    {deleteAction && (
                                        <span
                                            className={'eb-delete'}
                                            title="Delete"
                                            onClick={() => onDelete(index)}
                                        ><Dashicon icon={'trash'} /></span>
                                    )}
                                </div>

                                {clickedGradient === color?.slug && (
                                    <Popover
                                        anchor={gradientPopoverAnchor}
                                        className="eb-gradient-color-popup"
                                        placement="right"
                                        onClose={() => setClickedGradient('')}
                                    >
                                        <div className="eb-gradient-color-popup-content">
                                            <GradientPicker
                                                __nextHasNoMargin
                                                value={color?.color}
                                                onChange={(color) => setColor(index, color)}
                                                asButtons={true}
                                                clearable={true}
                                                gradients={[
                                                    {
                                                        name: color?.name,
                                                        gradient: color?.color,
                                                        slug: color?.slug,
                                                    }
                                                ]}
                                            />
                                        </div>
                                    </Popover>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default GradientColorPallet
