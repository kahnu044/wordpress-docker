import { useState, useEffect, useRef, useMemo } from "@wordpress/element";
import { select, dispatch } from "@wordpress/data";
const { times } = lodash;
import isEqual from 'lodash/isEqual'

export const editUseEffect = ({ clientId, attributes }) => {
    const {
        layout,
        navAlign,
        dropdownOpenOnClick,
        navBtnType,
        showDropdownIcon,
        flexWrap,
        navVerticalAlign,
        hamburgerMenu
    } = attributes;
    const innerBlocks = useMemo(() => {
        const parentBlocks = select("core/block-editor").getBlocksByClientId(clientId)[0]
        return parentBlocks?.innerBlocks
    }, [clientId])
    const { updateBlockAttributes } = dispatch("core/block-editor");

    const changedAttributes = {
        layout,
        navAlign,
        flexWrap,
        navVerticalAlign,
        dropdownOpenOnClick,
        showDropdownIcon,
        navBtnType,
        hamburgerMenu
    }
    const refAttributes = useRef({ ...changedAttributes })

    useEffect(() => {
        if (!isEqual(refAttributes.current, changedAttributes)) {
            refAttributes.current = changedAttributes
            if (!innerBlocks || innerBlocks.length === 0) {
                // If innerBlocks aren't available yet, set up a timeout to try again
                setTimeout(() => {
                    const parentBlocks = select("core/block-editor").getBlocksByClientId(clientId)[0];
                    const newInnerBlocks = parentBlocks?.innerBlocks;

                    if (newInnerBlocks && newInnerBlocks.length > 0) {
                        times(newInnerBlocks.length, (n) => {
                            updateBlockAttributes(newInnerBlocks[n].clientId, {
                                className: `${layout} ${layout == "is-horizontal" ? navAlign : navVerticalAlign
                                    } ${flexWrap === true ? "no-wrap" : ""}`,
                                openSubmenusOnClick: dropdownOpenOnClick,
                                showSubmenuIcon: showDropdownIcon,
                                hasIcon: navBtnType,
                                overlayMenu: hamburgerMenu,
                            });
                        });
                    }
                }, 500); // Give some time for innerBlocks to be created
            } else {
                times(innerBlocks.length, (n) => {
                    updateBlockAttributes(innerBlocks[n].clientId, {
                        className: `${layout} ${layout == "is-horizontal" ? navAlign : navVerticalAlign
                            } ${flexWrap === true ? "no-wrap" : ""}`,
                        openSubmenusOnClick: dropdownOpenOnClick,
                        showSubmenuIcon: showDropdownIcon,
                        hasIcon: navBtnType,
                        overlayMenu: hamburgerMenu,
                    });
                });
            }
        }

    }, [
        { ...changedAttributes }
    ]);
}
