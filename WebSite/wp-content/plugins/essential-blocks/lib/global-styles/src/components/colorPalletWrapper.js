
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import {
    Dashicon,
    ColorIndicator,
    TextControl,
    PanelRow,
    Dropdown,
    ColorPicker
} from "@wordpress/components";

const ColorPalletWrapper = (props) => {
    const { colorPanelArray, customColors, setCustomColors } = props

    const deleteItem = (index) => {
        const colors = [...customColors]
        colors.splice(index, 1);
        setCustomColors([...colors])
    }

    const editColorName = (index, value) => {
        let colors = [...customColors]
        colors[index] = {
            ...colors[index],
            name: value
        }
        setCustomColors([...colors])
    }

    const changeColor = (index, value) => {
        let colors = [...customColors]
        colors[index] = {
            ...colors[index],
            color: value
        }
        setCustomColors([...colors])
    }

    useEffect(() => {
        if (customColors.length > 0) {
            // deleteOptionHandler('.eb-custom-color-panel', '.components-tools-panel-item', deleteItem)
            const panel = document.querySelector('.eb-custom-color-panel');
            setTimeout(() => {
                const items = panel && panel.querySelectorAll('.components-tools-panel-item');
                if (items) {
                    items.forEach((item, index) => {
                        const newButton = document.createElement('button');
                        newButton.className = 'eb-delete-item';
                        const deleteIcon = document.createElement('span');
                        deleteIcon.className = 'dashicons dashicons-trash';
                        newButton.appendChild(deleteIcon);

                        deleteIcon.addEventListener('click', function () {
                            deleteItem(index)
                        });

                        const existingButton = item.querySelector('button');
                        item.insertBefore(newButton, existingButton.nextSibling);
                    })
                }
            }, 100)
        }
    }, [customColors])

    return (
        <>
            <PanelRow className="eb-gradient-color-label">Custom Colors</PanelRow>
            <div className="eb-custom-panel eb-custom-color-panel">
                {customColors.length > 0 && customColors.map((color, index) => (
                    <div key={index} className="eb-custom-element eb-global--color-item">
                        <Dropdown
                            className="color-indicator"
                            contentClassName="my-dropdown-content-classname"
                            popoverProps={{ placement: 'bottom-start' }}
                            renderToggle={({ isOpen, onToggle }) => (
                                <ColorIndicator
                                    onClick={onToggle}
                                    aria-expanded={isOpen}
                                    colorValue={color?.color} />
                            )}
                            renderContent={() => <ColorPicker onChange={(color) => changeColor(index, color)} />}
                        />

                        <TextControl
                            className={'eb-custom-element__edit-input'}
                            value={color.name || ''}
                            onChange={(text) => editColorName(index, text)}
                        />
                        <button
                            className={'eb-delete-item'}
                            onClick={() => deleteItem(index)}
                        >
                            <Dashicon icon="trash" />
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ColorPalletWrapper;
