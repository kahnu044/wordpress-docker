/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";

const List = (props) => {
    const {
        visibleHeaders,
        headers,
        deleteHeaderList,
        listStyle,
    } = props.attributes;

    const getDynamicValue = (value) => {
        let data = new FormData();
        data.append("action", "dynamic_field_value");
        data.append("value", value);
        data.append(
            "post_id",
            wp.data.select("core/editor").getCurrentPostId()
        );
        data.append("admin_nonce", EssentialBlocksProLocalize.admin_nonce);

        return fetch(EssentialBlocksProLocalize.ajax_url, {
            method: "POST",
            body: data,
        }) // wrapped
            .then((res) => res.text())
            .then((data) => {
                const result = JSON.parse(data);
                if (result.success) {
                    return result.data;
                } else {
                    return "Invalid response";
                }
            })
            .catch((err) => console.log(err));
    };

    const [dynamicValues, setDynamicValues] = useState({});

    useEffect(() => {
        if (typeof EssentialBlocksProLocalize !== "undefined") {
            const fetchData = async () => {
                const dynamicValues = {};

                for (let i = 0; i < headers.length; i++) {
                    const { content } = headers[i];
                    const dynamicValue = await getDynamicValue(content); // Fetch dynamic value for content
                    dynamicValues[content] = dynamicValue;
                }

                setDynamicValues(dynamicValues);
            };

            fetchData();
        } else {
            for (let i = 0; i < headers.length; i++) {
                const { content } = headers[i];
                dynamicValues[content] = content;
            }

            setDynamicValues(dynamicValues);
        }
    }, [headers]);

    const ebGenerateTOC = (data) => {
        let toc = `<${listStyle} class="eb-toc__list">`;
        let stack = [];
        let counter = 0;
        for (let i = 0; i < data.length; i++) {
            const { level, content, link } = data[i];

            while (stack.length > 0 && stack[stack.length - 1].level >= level) {
                stack.pop();
                toc += `</li></${listStyle}>`;
            }

            // Use the dynamic value from the state
            const dynamicValue = dynamicValues[content] || "";

            toc += `<li><a href="#${link}">${dynamicValue}</a>`;

            if (i < data.length - 1 && data[i + 1].level > level) {
                toc += `<${listStyle} class="eb-toc__list">`;
                stack.push({ level, content, link });
            }
            counter++;
        }

        while (stack.length > 0) {
            stack.pop();
            toc += `</li></${listStyle}>`;
        }

        toc += `</${listStyle}>`;

        return toc;
    };

    if (
        visibleHeaders != "undefined" &&
        headers &&
        headers.length > 0 &&
        headers.filter((header) => visibleHeaders[header.level - 1]).length > 0
    ) {
        let newHeaders = [];
        headers.forEach((item, index) => {
            if (
                deleteHeaderList &&
                deleteHeaderList.length > 0 &&
                deleteHeaderList[index] &&
                deleteHeaderList[index].hasOwnProperty("isDelete") &&
                deleteHeaderList[index].isDelete === false
            ) {
                newHeaders.push(headers[index]);
            }
        });

        return (
            <div
                className="eb-toc__list-wrap"
                dangerouslySetInnerHTML={{
                    __html:
                        newHeaders.length > 0
                            ? ebGenerateTOC(newHeaders)
                            : ebGenerateTOC(headers),
                }}
            ></div>
        );
    } else {
        return (
            <p className="eb_table-of-contents-placeholder">
                {__(
                    "Add a header to begin generating the table of contents",
                    "essential-blocks"
                )}
            </p>
        );
    }
};

export default List;
