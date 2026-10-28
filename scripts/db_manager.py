"""
Arte Inédito | Publicidad y Textiles
Módulo de Gestión de Base de Datos SQLite (Python 3)

Este script proporciona utilidades de administración de datos para el negocio:
- Inspección de tablas y esquemas
- Exportación de cotizaciones a formato CSV/JSON para contabilidad
- Registro rápido de nuevas cotizaciones desde consola
- Reporte ejecutivo de métricas comerciales (Folios, estados, totales en USD)
"""

import sqlite3
import os
import json
import csv
from datetime import datetime
from typing import Dict, List, Any, Optional

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "arteinedito.sqlite")


def get_db_connection() -> sqlite3.Connection:
    """Establece conexión a la base de datos SQLite con soporte para diccionarios (Row)."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def get_summary_report() -> Dict[str, Any]:
    """
    Genera un informe gerencial rápido para el taller de Arte Inédito.
    Ideal para revisión matutina en Esquina Inédita, Lechería.
    """
    if not os.path.exists(DB_PATH):
        return {"error": f"Base de datos no encontrada en {DB_PATH}"}

    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        # Conteo total y por estado
        cursor.execute("""
            SELECT status, COUNT(*) as count, SUM(COALESCE(estimated_total_usd, 0)) as total_usd
            FROM quotes
            GROUP BY status
        """)
        status_rows = cursor.fetchall()
        
        # Total de productos activos
        cursor.execute("SELECT COUNT(*) as count FROM products WHERE active = 1")
        active_products = cursor.fetchone()["count"]

        # Cotizaciones recientes
        cursor.execute("""
            SELECT id, client_name, client_company, product_name, estimated_total_usd, status, created_at
            FROM quotes
            ORDER BY created_at DESC
            LIMIT 5
        """)
        recent_quotes = [dict(row) for row in cursor.fetchall()]

    return {
        "status_breakdown": [dict(r) for r in status_rows],
        "active_products": active_products,
        "recent_quotes": recent_quotes,
        "generated_at": datetime.now().isoformat()
    }


def export_quotes_to_csv(output_filepath: str = "cotizaciones_arte_inedito.csv") -> str:
    """
    Exporta todas las cotizaciones a un archivo CSV listo para Excel o Google Sheets.
    Facilita la conciliación administrativa y facturación con RIF J-412848798.
    """
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM quotes ORDER BY created_at DESC")
        rows = cursor.fetchall()

        if not rows:
            return "No hay cotizaciones para exportar."

        headers = rows[0].keys()
        with open(output_filepath, mode="w", newline="", encoding="utf-8") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(headers)
            for row in rows:
                writer.writerow(list(row))

    return f"Exportadas {len(rows)} cotizaciones exitosamente a: {output_filepath}"


if __name__ == "__main__":
    print("=" * 60)
    print(" Arte Inédito | Sistema de Gestión SQLite")
    print(" Esquina Inédita - Lechería, Anzoátegui")
    print("=" * 60)
    report = get_summary_report()
    print(json.dumps(report, indent=2, ensure_ascii=False))
