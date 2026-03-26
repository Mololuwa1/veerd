import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { error: insertError } = await supabase
      .from("email_subscribers")
      .insert({
        email,
        source: source || "website",
        confirmed: false,
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      // Unique constraint violation means email already exists
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on our list" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    try {
      await sendWelcomeEmail(email);
    } catch (emailError) {
      console.error("Email send error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
