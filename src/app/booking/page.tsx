import Link from "next/link";

export default function Booking() {
    return (
        <div>
            <h1>Booking managers</h1>
            <ul>
                <li>
                    <Link href="/booking/manager1">
                        <p>Manager 1</p>
                    </Link>
                </li>
                <li>
                    <Link href="/booking/manager2">
                        <p>Manager 2</p>
                    </Link>
                </li>
                <li>
                    <Link href="/booking/manager3">
                        <p>Manager 3</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
