import {
    sanitizeURL,
    EBDisplayIconEdit,
    EBDisplayIconSave
} from "@essential-blocks/controls";

export default function socialLinks({ profilesOnly, icnEffect, isEdit = false }) {
    const IconComponent = isEdit ? EBDisplayIconEdit : EBDisplayIconSave;

    return (
        <ul className="eb-socials">
            {profilesOnly.map(({ link, icon, linkOpenNewTab }, index) => (
                <li key={index}>
                    <a
                        className={`${((icon || " ").match(/fa-([\w\-]+)/i) || [
                            " ",
                            " ",
                        ])[1]
                            }-original ${icnEffect || " "}`}
                        href={link === '#' ? '' : sanitizeURL(link)}
                        target={linkOpenNewTab ? "_blank" : "_self"}
                        rel="noopener"
                        aria-label="social link"
                    >
                        <IconComponent
                            className={`hvr-icon eb-social-icon`}
                            icon={icon}
                        />
                    </a>
                </li>
            ))}
        </ul>
    );
}
