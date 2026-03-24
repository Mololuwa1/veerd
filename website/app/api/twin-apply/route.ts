import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import {
  sendTwinConfirmationEmail,
  sendTwinApplicationNotification,
} from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      currentRole,
      previousRole,
      transitionYear,
      quote,
      availabilityTier,
      linkedinUrl,
    } = body;

    if (
      !name ||
      !email ||
      !currentRole ||
      !previousRole ||
      !transitionYear ||
      !quote ||
      !availabilityTier
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { error: insertError } = await supabase
      .from("twin_applications")
      .insert({
        name,
        email,
        current_role: currentRole,
        previous_role: previousRole,
        transition_year: transitionYear,
        quote,
        availability_tier: availabilityTier,
        linkedin_url: linkedinUrl || null,
        status: "pending",
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    try {
      await sendTwinConfirmationEmail(email, name);
      await sendTwinApplicationNotification({
        name,
        email,
        currentRole,
        previousRole,
        transitionYear,
        quote,
        availabilityTier,
        linkedinUrl,
      });
    } catch (emailError) {
      console.error("Email send error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
