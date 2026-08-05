import React, { forwardRef } from "react";
import { GraduationCap } from "lucide-react";
import { convertTo12Hour } from "../utils/timeUtils";

const C = {
  border: "#E2E8F0",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  emerald: "#10B981",
  emeraldLight: "#ECFDF5",
  cyan: "#0EA5E9",
  cyanLight: "#E0F2FE",
  amber: "#F59E0B",
  amberLight: "#FFFBEB",
  bg: "#F8FAFC",
};

const catLabel = {
  little_pearls: "Little Pearls",
  bright_pearls: "Bright Pearls",
  rising_pearls: "Rising Pearls",
  academic_tuition: "Academic Tuition",
  courses: "Courses",
};

function formatDate(value) {
  if (!value) return "";
  const date = value?._seconds ? new Date(value._seconds * 1000) : new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatClassDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * ReceiptDocument — the formatted, printable fee receipt.
 * Wrap this in a ref (forwardRef) so it can be captured to PDF via html2canvas.
 * Used by GenerateReceiptModal (admin) and StudentReceiptsSection (student).
 */
const ReceiptDocument = forwardRef(({ receipt }, ref) => {
  if (!receipt) return null;

  const periodLabel = receipt.periodFrom && receipt.periodTo
    ? `${formatClassDate(receipt.periodFrom)} – ${formatClassDate(receipt.periodTo)}`
    : receipt.periodFrom
      ? `From ${formatClassDate(receipt.periodFrom)}`
      : receipt.periodTo
        ? `Up to ${formatClassDate(receipt.periodTo)}`
        : "All completed classes to date";

  return (
    <div ref={ref} style={{ background: "#FFFFFF", width: "100%", maxWidth: 720, margin: "0 auto", padding: 36, fontFamily: "'Segoe UI', Arial, sans-serif", color: C.textPrimary, boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `2px solid ${C.emerald}`, paddingBottom: 18, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GraduationCap style={{ width: 24, height: 24, color: "#fff" }} />
          </div>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.01em" }}>PearlX Coding Academy</p>
            <p style={{ fontSize: 11, color: C.textMuted }}>www.pearlx.in</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: C.emerald, letterSpacing: "0.04em" }}>FEE RECEIPT</p>
          <p style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{receipt.receiptId}</p>
        </div>
      </div>

      {/* Bill to / meta */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.06em", marginBottom: 6 }}>BILLED TO</p>
          <p style={{ fontSize: 15, fontWeight: 700 }}>{receipt.studentName}</p>
          <p style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>Student ID: {receipt.studentCustomId}</p>
          {receipt.classLevel && <p style={{ fontSize: 12, color: C.textSecondary }}>Grade: {receipt.classLevel}</p>}
          {receipt.category && <p style={{ fontSize: 12, color: C.textSecondary }}>Program: {catLabel[receipt.category] || receipt.category}</p>}
          {receipt.subjects?.length > 0 && <p style={{ fontSize: 12, color: C.textSecondary }}>Subjects: {receipt.subjects.join(", ")}</p>}
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.06em", marginBottom: 6 }}>RECEIPT DETAILS</p>
          <p style={{ fontSize: 12, color: C.textSecondary }}>Generated: {formatDate(receipt.generatedAt)}</p>
          <p style={{ fontSize: 12, color: C.textSecondary }}>Billing Period: {periodLabel}</p>
          <p style={{ fontSize: 12, color: C.textSecondary }}>Fee per Hour: {formatCurrency(receipt.feePerHour)}</p>
          <span style={{ display: "inline-block", marginTop: 6, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: receipt.status === "paid" ? C.emeraldLight : C.amberLight, color: receipt.status === "paid" ? C.emerald : C.amber }}>
            {receipt.status === "paid" ? "PAID" : "UNPAID"}
          </span>
        </div>
      </div>

      {/* Classes table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <thead>
          <tr style={{ background: C.bg }}>
            <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: C.textMuted, border: `1px solid ${C.border}` }}>#</th>
            <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: C.textMuted, border: `1px solid ${C.border}` }}>Date</th>
            <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: C.textMuted, border: `1px solid ${C.border}` }}>Time</th>
            <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: C.textMuted, border: `1px solid ${C.border}` }}>Subject</th>
            <th style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: C.textMuted, border: `1px solid ${C.border}` }}>Tutor</th>
            <th style={{ textAlign: "right", padding: "8px 10px", fontSize: 11, fontWeight: 700, color: C.textMuted, border: `1px solid ${C.border}` }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {receipt.classes?.map((cls, i) => (
            <tr key={cls.id || i}>
              <td style={{ padding: "7px 10px", fontSize: 12, border: `1px solid ${C.border}` }}>{i + 1}</td>
              <td style={{ padding: "7px 10px", fontSize: 12, border: `1px solid ${C.border}` }}>
                {formatClassDate(cls.classDate)}{cls.isRescheduled && <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 700, color: C.amber }}>RESCHEDULED</span>}
              </td>
              <td style={{ padding: "7px 10px", fontSize: 12, border: `1px solid ${C.border}` }}>{convertTo12Hour ? convertTo12Hour(cls.classTime) : cls.classTime}</td>
              <td style={{ padding: "7px 10px", fontSize: 12, border: `1px solid ${C.border}` }}>{cls.subject}</td>
              <td style={{ padding: "7px 10px", fontSize: 12, border: `1px solid ${C.border}` }}>{cls.tutorName}</td>
              <td style={{ padding: "7px 10px", fontSize: 12, border: `1px solid ${C.border}`, textAlign: "right" }}>{formatCurrency(receipt.feePerHour)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <div style={{ width: 260 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: C.textSecondary }}>
            <span>Total Completed Classes</span><span>{receipt.totalClasses}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: C.textSecondary }}>
            <span>Total Hours Billed</span><span>{receipt.totalHours}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: C.textSecondary }}>
            <span>Fee per Hour</span><span>{formatCurrency(receipt.feePerHour)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", marginTop: 6, borderTop: `2px solid ${C.textPrimary}`, fontSize: 16, fontWeight: 800 }}>
            <span>Total Amount Due</span><span style={{ color: C.emerald }}>{formatCurrency(receipt.totalAmount)}</span>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, textAlign: "center" }}>
        <p style={{ fontSize: 11, color: C.textMuted }}>This is a computer-generated receipt from PearlX Coding Academy.</p>
        <p style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>For queries regarding this receipt, please contact your program admin.</p>
      </div>
    </div>
  );
});

ReceiptDocument.displayName = "ReceiptDocument";

export default ReceiptDocument;