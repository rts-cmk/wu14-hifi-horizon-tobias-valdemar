import { useState } from "react";

export default function DeliveryMethod() {
    const [activeTab, setActiveTab] = useState("homeDelivery");

    const deliveryContent = {
        homeDelivery: (
            <div>
                <h3>Home Delivery Selected</h3>
                <p>Your items will be delivered to your home address.</p>
            </div>
        ),
        clickCollect: (
            <div>
                <h3>Click & Collect Selected</h3>
                <p>Your items will be ready for pickup at the selected store.</p>
            </div>
        ),
        postOffice: (
            <div>
                <h3>Post Office Selected</h3>
                <p>Your items will be sent to your nearest post office for collection.</p>
            </div>
        ),
    }

    return (
        <div className="delivery-card">
            <div className="delivery-card__tabs">
                <button
                    className={activeTab === "homeDelivery" ? "active" : ""}
                    onClick={() => setActiveTab("homeDelivery")}
                >
                    Home Delivery
                </button>
                <button
                    className={activeTab === "clickCollect" ? "active" : ""}
                    onClick={() => setActiveTab("clickCollect")}
                >
                    Click & Collect
                </button>
                <button
                    className={activeTab === "postOffice" ? "active" : ""}
                    onClick={() => setActiveTab("postOffice")}
                >
                    Postoffice
                </button>
            </div>

            <div className="delivery-card__content">
                {deliveryContent[activeTab]}
            </div>
        </div>
    )
}