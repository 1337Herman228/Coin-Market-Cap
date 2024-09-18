"use client";

import { ConfigProvider, Modal } from "antd";
import React, { useState } from "react";

const modalStyles = {
    mask: {
        // backdropFilter: 'none',
        backdropFilter: "blur(10px)",
        // backgroundColor: 'transparent', // Цвет фона под модальным окном
    },
    content: {
        // padding:'60px',
        color: "var(--c-color-text-primary)",
        backgroundColor: "var(--c-color-gray-100)", //Цвет фона
        // borderRadius: 'var(--border-radius-modal)',
        colorIcon: "var(--c-color-text-primary)",
        // backdropFilter: 'blur(50px)',
    },
};

interface StyledModalProps {
    isModalOpen: boolean[];
    toggleModal: (idx: number, target: boolean) => void;
    children: React.ReactNode;
    centered?: boolean;
    modalId: number;
    style?: React.CSSProperties;
    width?: number;
}

const StyledModal = ({
    isModalOpen,
    toggleModal,
    children,
    centered = false,
    modalId,
    style,
    width,
}: StyledModalProps) => {
    return (
        <ConfigProvider
            modal={{
                styles: modalStyles,
            }}
        >
            <Modal
                zIndex={6000}
                style={style}
                centered={centered}
                open={isModalOpen[modalId]}
                onCancel={() => toggleModal(modalId, false)}
                width={width}
                closeIcon={true}
                footer={(_) => (
                    <>
                        {/* <button className='delete-modal-btn mr main-color-transparent-rect-btn' onClick={handleCancel}>Отмена</button> */}
                    </>
                )}
            >
                <div className="">{children}</div>
            </Modal>
        </ConfigProvider>
    );
};

export default StyledModal;
